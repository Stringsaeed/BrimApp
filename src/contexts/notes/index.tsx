import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";

import useNotesQuery from "hooks/use-notes-query";
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

  const contextValue = useMemo(() => ({ notes: data }), [data]);

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
