import React, { PropsWithChildren, useCallback, useMemo } from "react";

import {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from "hooks";
import { UpdateNoteMutationInput } from "hooks/use-update-note-mutation";
import { Note } from "types";

type NotesListContext = {
  notes: Note[];
  getNote: (id: string) => Note;
  addNote: (note: Omit<Note, "id">) => void;
  updateNote: (note: UpdateNoteMutationInput) => void;
  deleteNote: (note: Note) => void;
  archiveNote: (id: string) => void;
  unarchiveNote: (id: string) => void;
};

type NotesListProviderProps = PropsWithChildren<{
  notes: Note[];
}>;

const notesListContext = React.createContext<NotesListContext | undefined>(
  undefined
);

const { Provider } = notesListContext;

export const NotesListProvider = ({
  children,
  notes,
}: NotesListProviderProps) => {
  const createNoteMutation = useCreateNoteMutation();
  const updateNoteMutation = useUpdateNoteMutation();
  const deleteNoteMutation = useDeleteNoteMutation();

  const getNote = useCallback(
    (id: string) => {
      const note = notes.find((note) => note.id === id);
      if (!note) {
        throw new Error(`Note with id ${id} not found`);
      }
      return note;
    },
    [notes]
  );

  const addNote = useCallback(
    (note: Omit<Note, "id">) => {
      createNoteMutation.mutate(note);
    },
    [createNoteMutation]
  );

  const updateNote = useCallback(
    (note: UpdateNoteMutationInput) => {
      updateNoteMutation.mutate(note);
    },
    [updateNoteMutation]
  );

  const deleteNote = useCallback(
    (note: Note) => {
      deleteNoteMutation.mutate(note);
    },
    [deleteNoteMutation]
  );

  const archiveNote = useCallback(
    (id: string) => {
      const { user, ...restNote } = getNote(id);
      if (restNote.is_archived) {
        return;
      }

      if (!user) {
        return;
      }

      updateNoteMutation.mutate({
        ...restNote,
        is_archived: true,
        user,
        id,
      });
    },
    [getNote, updateNoteMutation]
  );

  const unarchiveNote = useCallback(
    (id: string) => {
      const { user, ...restNote } = getNote(id);
      if (!restNote.is_archived) {
        return;
      }

      if (!user) {
        return;
      }

      updateNoteMutation.mutate({
        ...restNote,
        is_archived: false,
        user,
        id,
      });
    },
    [getNote, updateNoteMutation]
  );

  const contextValue = useMemo<NotesListContext>(
    () => ({
      unarchiveNote,
      archiveNote,
      updateNote,
      deleteNote,
      addNote,
      getNote,
      notes,
    }),
    [
      addNote,
      archiveNote,
      deleteNote,
      getNote,
      notes,
      unarchiveNote,
      updateNote,
    ]
  );

  return <Provider value={contextValue}>{children}</Provider>;
};

export const useNotesList = () => {
  const context = React.useContext(notesListContext);
  if (context === undefined) {
    throw new Error("useNotesList must be used within a NotesListProvider");
  }
  return context;
};
