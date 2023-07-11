import database from "@react-native-firebase/database";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { useAuth } from "contexts/auth";
import { useCreateNoteMutation, useNotesQuery } from "hooks";
import { Note, noteSchema } from "types";

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export interface NotesContextType {
  notes: Note[];
  addNote: (
    note: Pick<Note, "title" | "note">,
    isDraft?: boolean
  ) => Promise<Note>;
  removeNote: (id: string) => Promise<void>;
  archiveNote: (id: string) => Promise<void>;
}

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const { data = [] } = useNotesQuery();

  const createNoteMutation = useCreateNoteMutation();
  const { user } = useAuth();

  const addNote = useCallback(
    async (note: Pick<Note, "title" | "note">, isDraft?: boolean) => {
      const now = new Date().toISOString();
      const ref = await createNoteMutation.mutateAsync({
        user: user?.uid ?? null,
        is_archived: false,
        is_private: false,
        title: note.title,
        is_draft: isDraft,
        note: note.note,
        created_at: now,
        updated_at: now,
      });
      const newNoteSnapshot = await ref.once("value");

      return noteSchema.parse({ ...newNoteSnapshot.val(), id: ref.key });
    },
    [createNoteMutation, user?.uid]
  );

  const removeNote = useCallback(
    async (id: string) => {
      await database().ref(`/notes/${user?.uid}/${id}`).remove();
    },
    [user?.uid]
  );

  const archiveNote = useCallback(
    async (id: string) => {
      await database().ref(`/notes/${user?.uid}/${id}`).update({
        is_archived: true,
      });
    },
    [user?.uid]
  );

  const syncNotes = useCallback(async () => {
    const toRemoved = data
      .map((note) => {
        if (note.is_draft) return;
        if (note.note) return;
        if (note.title) return;
        return removeNote(note.id);
      })
      .filter(Boolean);

    await Promise.all(toRemoved);
  }, [data, removeNote]);

  const contextValue = useMemo(
    () => ({
      notes: data,
      archiveNote,
      removeNote,
      addNote,
    }),
    [addNote, archiveNote, data, removeNote]
  );

  useEffect(() => {
    syncNotes();
  }, [syncNotes]);

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }

  return context;
};
