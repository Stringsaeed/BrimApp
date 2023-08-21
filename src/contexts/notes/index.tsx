import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";

import { useNotesQuery } from "hooks";
import { NoteService } from "services";
import { Note } from "types";

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export interface NotesContextType {
  notes: Note[];
}

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const { data = [] } = useNotesQuery();

  const removeNote = useCallback(async (id: string) => {
    await NoteService.delete(id);
  }, []);

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

  useEffect(() => {
    syncNotes();
  }, [syncNotes]);

  return (
    <NotesContext.Provider value={{ notes: data }}>
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
