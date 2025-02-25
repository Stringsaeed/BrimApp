import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import { parseISO } from "date-fns/parseISO";
import React, { PropsWithChildren, useCallback, useMemo } from "react";

import {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useHaptic,
  useSearchableNotes,
  useUpdateNoteMutation,
} from "hooks";
import { UpdateNoteMutationInput } from "hooks/use-update-note-mutation";
import { DateType, Note } from "types";

type NotesListContext = {
  notes: Note[];
  sections: {
    title: string;
    data: Note[];
  }[];
  addNote: (note: Omit<Note, "id">) => void;
  updateNote: (note: UpdateNoteMutationInput) => void;
  deleteNote: (note: Note) => void;
  archiveNote: (id: string) => void;
  unarchiveNote: (id: string) => void;
  restoreNote: (id: string) => void;
  onSearchValueChange?: (value: string) => void;
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

const getDateTitle = (date: DateType) => {
  if (!date) return "";
  return formatDistanceToNowStrict(
    typeof date === "string" ? parseISO(date) : date,
    {
      addSuffix: true,
    }
  );
};

export const NotesListProvider = ({
  notes: unSearchedNotes,
  children,
}: NotesListProviderProps) => {
  const [multiSelectMode, setMultiSelectMode] = React.useState(false);
  const [selectedNotes, setSelectedNote] = React.useState<Note["id"][]>([]);
  const isSearchBarVisible = unSearchedNotes.length > 0;
  const [notes, { onSearchValueChange, searchValue }] =
    useSearchableNotes(unSearchedNotes);
  const sections = useMemo(() => {
    // group the notes by date and convert them to an array title and data
    const groupedNotes = notes.reduce(
      (acc, note) => {
        const date = getDateTitle(note.updated_at);
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(note);
        return acc;
      },
      {} as Record<string, Note[]>
    );

    return Object.entries(groupedNotes).map(([title, data]) => ({
      title,
      data,
    }));
  }, [notes]);

  const createNoteMutation = useCreateNoteMutation();
  const updateNoteMutation = useUpdateNoteMutation();
  const deleteNoteMutation = useDeleteNoteMutation();
  const haptic = useHaptic();

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
      updateNoteMutation.mutate({ status: "archived", id });
    },
    [updateNoteMutation]
  );

  const unarchiveNote = useCallback(
    (id: string) => {
      updateNoteMutation.mutate({ status: "published", id });
    },
    [updateNoteMutation]
  );

  const restoreNote = useCallback(
    (id: string) => {
      updateNoteMutation.mutate({
        status: "published",
        id,
      });
    },
    [updateNoteMutation]
  );

  const onNoteSelect = useCallback(
    (id: Note["id"]) => {
      void haptic?.();
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
      sections,
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
      sections,
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
