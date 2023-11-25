import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { InteractionManager } from "react-native";

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

  const syncNotes = useCallback(() => {
    InteractionManager.runAfterInteractions(async () => {
      const toRemoved = data
        .map(async (note) => {
          if (
            note.deleted_at ||
            note.status === "draft" ||
            note.note ||
            note.title
          )
            return;
          return await removeNote(note.id);
        })
        .filter(Boolean);

      await Promise.all(toRemoved);
    });
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
