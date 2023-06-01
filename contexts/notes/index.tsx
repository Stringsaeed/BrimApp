import React, { useCallback } from "react";
import database from "@react-native-firebase/database";

import { useAuth } from "contexts/auth";
import { useCreateNoteMutation, useNotesQuery } from "hooks";
import { Note } from "types";

const NotesContext = React.createContext<NotesContextType | undefined>(
  undefined
);

export interface NotesContextType {
  notes: Note[];
  addNote: (note: string, isDraft?: boolean) => Promise<string | null>;
  removeNote: (id: string) => void;
}

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useNotesQuery();

  const createNoteMutation = useCreateNoteMutation();
  const { user } = useAuth();

  const addNote = useCallback(
    async (noteText: string, isDraft: boolean = false) => {
      const ref = await createNoteMutation.mutateAsync({
        note: noteText,
        user: user?.uid ?? null,
        created_at: new Date().toISOString(),
        is_draft: isDraft,
      });

      return ref.key;
    },
    [createNoteMutation, user?.uid]
  );

  const removeNote = useCallback(
    (id: string) => {
      return database().ref(`/notes/${user?.uid}/${id}`).remove();
    },
    [user?.uid]
  );

  const syncNotes = useCallback(async () => {
    const toRemoved = data
      .map((note) => {
        if (note.is_draft) return;
        if (note.note) return;
        return removeNote(note.id);
      })
      .filter(Boolean);

    await Promise.all(toRemoved);
  }, [data, removeNote]);

  React.useEffect(() => {
    syncNotes();
  }, [syncNotes]);

  return (
    <NotesContext.Provider value={{ notes: data ?? [], addNote, removeNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => {
  const context = React.useContext(NotesContext);

  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }

  return context;
};
