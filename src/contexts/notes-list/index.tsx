import React, { PropsWithChildren, useCallback, useMemo } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

import {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useSearchableNotes,
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
  restoreNote: (id: string) => void;
  onSearchValueChange?: (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => void;
  searchValue?: string;
  isSearchBarVisible?: boolean;
};

type NotesListProviderProps = PropsWithChildren<
  Pick<NotesListContext, "notes">
>;

const notesListContext = React.createContext<NotesListContext | undefined>(
  undefined
);

const { Provider } = notesListContext;

export const NotesListProvider = ({
  notes: unSearchedNotes,
  children,
}: NotesListProviderProps) => {
  const isSearchBarVisible = unSearchedNotes.length > 0;
  const [notes, { onSearchValueChange, searchValue }] =
    useSearchableNotes(unSearchedNotes);
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

  const restoreNote = useCallback(
    (id: string) => {
      const { user, ...restNote } = getNote(id);
      const restorable =
        restNote.is_archived ||
        restNote.is_trashed ||
        ["trashed", "archived"].includes(restNote.status);

      if (!restorable) {
        return;
      }

      if (!user) {
        return;
      }

      updateNoteMutation.mutate({
        ...restNote,
        status: "published",
        is_archived: false,
        is_trashed: false,
        user,
        id,
      });
    },
    [getNote, updateNoteMutation]
  );

  const contextValue = useMemo<NotesListContext>(
    () => ({
      onSearchValueChange,
      isSearchBarVisible,
      unarchiveNote,
      archiveNote,
      restoreNote,
      searchValue,
      updateNote,
      deleteNote,
      addNote,
      getNote,
      notes,
    }),
    [
      onSearchValueChange,
      isSearchBarVisible,
      unarchiveNote,
      archiveNote,
      restoreNote,
      searchValue,
      updateNote,
      deleteNote,
      addNote,
      getNote,
      notes,
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
