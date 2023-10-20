import React, { PropsWithChildren, useCallback, useMemo } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

import {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useHaptic,
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
  selectedNotes: Note["id"][];
  onNoteSelect: (id: Note["id"]) => void;
  multiSelectMode?: boolean;
  toggleMultiSelectMode?: () => void;
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
  const [multiSelectMode, setMultiSelectMode] = React.useState(false);
  const [selectedNotes, setSelectedNote] = React.useState<Note["id"][]>([]);
  const isSearchBarVisible = unSearchedNotes.length > 0;
  const [notes, { onSearchValueChange, searchValue }] =
    useSearchableNotes(unSearchedNotes);
  const createNoteMutation = useCreateNoteMutation();
  const updateNoteMutation = useUpdateNoteMutation();
  const deleteNoteMutation = useDeleteNoteMutation();
  const haptic = useHaptic();

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

  const onNoteSelect = useCallback(
    (id: Note["id"]) => {
      haptic?.();
      if (!multiSelectMode) {
        setSelectedNote([id]);
        setMultiSelectMode(true);
        return;
      }
      if (selectedNotes.includes(id)) {
        setSelectedNote((prev) => prev.filter((noteId) => noteId !== id));
      } else {
        setSelectedNote((prev) => [...prev, id]);
      }
    },
    [haptic, multiSelectMode, selectedNotes]
  );

  const toggleMultiSelectMode = useCallback(() => {
    setMultiSelectMode((prevValue) => {
      const newValue = !prevValue;
      if (newValue) {
        setSelectedNote([]);
      }

      return newValue;
    });
  }, []);

  const contextValue = useMemo<NotesListContext>(
    () => ({
      toggleMultiSelectMode,
      onSearchValueChange,
      isSearchBarVisible,
      multiSelectMode,
      selectedNotes,
      unarchiveNote,
      onNoteSelect,
      searchValue,
      restoreNote,
      archiveNote,
      deleteNote,
      updateNote,
      getNote,
      addNote,
      notes,
    }),
    [
      toggleMultiSelectMode,
      onSearchValueChange,
      isSearchBarVisible,
      multiSelectMode,
      selectedNotes,
      unarchiveNote,
      onNoteSelect,
      searchValue,
      restoreNote,
      archiveNote,
      deleteNote,
      updateNote,
      getNote,
      addNote,
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
