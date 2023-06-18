import database from "@react-native-firebase/database";
import { FlashList } from "@shopify/flash-list";
import React, {
  ReactNode,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { enableLayoutAnimations } from "react-native-reanimated";

import { useAuth } from "contexts/auth";
import { useCreateNoteMutation, useNotesQuery } from "hooks";
import { noteSchema } from "hooks/use-notes-query/schema";
import { Note } from "types";

const NotesContext = createContext<NotesContextType | undefined>(undefined);

type ListRef = RefObject<FlashList<Note>> | undefined;

export interface NotesContextType {
  notes: Note[];
  addNote: (
    note: Pick<Note, "title" | "note">,
    isDraft?: boolean
  ) => Promise<Note>;
  removeNote: (id: string, ref?: ListRef) => Promise<void>;
  archiveNote: (id: string, ref?: ListRef) => Promise<void>;
  updateNote: (
    id: string,
    note: Partial<Pick<Note, "title" | "note">>
  ) => Promise<void>;
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
        is_draft: isDraft,
        title: note.title,
        updated_at: now,
        created_at: now,
        note: note.note,
      });
      const newNoteSnapshot = await ref.once("value");

      return noteSchema.parse({ ...newNoteSnapshot.val(), id: ref.key });
    },
    [createNoteMutation, user?.uid]
  );

  const handleLayoutAnimation = (ref?: ListRef) => {
    if (ref) {
      enableLayoutAnimations(false);
      ref.current?.prepareForLayoutAnimationRender();
      requestAnimationFrame(() => {
        enableLayoutAnimations(true);
      });
    }
  };

  const removeNote = useCallback(
    async (id: string, ref?: ListRef) => {
      await database().ref(`/notes/${user?.uid}/${id}`).remove();

      handleLayoutAnimation(ref);
    },
    [user?.uid]
  );

  const archiveNote = useCallback(
    async (id: string, ref?: ListRef) => {
      await database().ref(`/notes/${user?.uid}/${id}`).update({
        is_archived: true,
      });

      handleLayoutAnimation(ref);
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

  const updateNote = useCallback(
    async (id: string, note: Partial<Pick<Note, "title" | "note">>) => {
      const now = new Date().toISOString();
      await database()
        .ref(`/notes/${user?.uid}/${id}`)
        .update({
          ...note,
          updated_at: now,
          is_draft: false,
        });
    },
    [user?.uid]
  );

  const contextValue = useMemo(
    () => ({
      notes: data,
      archiveNote,
      updateNote,
      removeNote,
      addNote,
    }),
    [addNote, archiveNote, data, removeNote, updateNote]
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
