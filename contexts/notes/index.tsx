import React, { useCallback } from "react";

import { useAuth } from "contexts/auth";
import { useCreateNoteMutation, useNotesQuery } from "hooks";
import { Note } from "types";

const NotesContext = React.createContext<NotesContextType | undefined>(
  undefined
);

export interface NotesContextType {
  notes: Note[];
  addNote: (note: string) => void;
  removeNote: (id: number) => void;
}

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useNotesQuery();
  const createNoteMutation = useCreateNoteMutation();
  const { user } = useAuth();

  const addNote = useCallback(
    async (noteText: string) => {
      await createNoteMutation.mutateAsync({
        note: noteText,
        user: user?.uid ?? null,
        created_at: new Date().toISOString(),
        is_draft: false,
      });
    },
    [createNoteMutation, user?.uid]
  );

  const removeNote = useCallback((_: number) => {}, []);

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
