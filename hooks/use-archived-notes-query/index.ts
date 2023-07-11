import database from "@react-native-firebase/database";
import { useMemo } from "react";

import { useAuth } from "contexts/auth";
import { useDatabaseSnapshot } from "hooks/use-database-snapshot";
import useUpdateInMemoryNotesStore from "hooks/use-update-in-memory-notes-store";
import { Note } from "types";
import { getNotesFromSnapshot } from "utils";

export default function useArchivedNotesQuery() {
  const updateInMemoryNotesStore = useUpdateInMemoryNotesStore();

  const { user } = useAuth();
  const ref = database()
    .ref(`/notes/${user?.uid}`)
    .orderByChild("is_archived")
    .equalTo(true);

  const snapshotQuery = useDatabaseSnapshot(
    ["archived-notes"],
    ref,
    {
      subscribe: true,
    },
    {
      onSuccess(data) {
        if (!data) return;
        updateInMemoryNotesStore(getNotesFromSnapshot(data));
      },
    }
  );

  const data = useMemo<Note[]>(() => {
    if (!snapshotQuery.data) return [];
    const notes: Note[] = [];
    snapshotQuery.data.forEach((note) => {
      notes.push({
        ...note.val(),
        id: note.key,
      });
      return undefined;
    });
    return notes;
  }, [snapshotQuery.data]);

  return {
    ...snapshotQuery,
    data,
  };
}
