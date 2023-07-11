import database from "@react-native-firebase/database";
import { useMemo } from "react";

import { useAuth } from "contexts/auth";
import { useDatabaseSnapshot } from "hooks/use-database-snapshot";
import useUpdateInMemoryNotesStore from "hooks/use-update-in-memory-notes-store";
import { getNotesFromSnapshot } from "utils";

export default function useNotesQuery() {
  const updateInMemoryNotesStore = useUpdateInMemoryNotesStore();
  const { user } = useAuth();
  const { data: snapshot } = useDatabaseSnapshot(
    ["notes"],
    database()
      .ref(`/notes/${user?.uid}`)
      .orderByChild("is_archived")
      .equalTo(false),
    { subscribe: true },
    {
      onSuccess(data) {
        updateInMemoryNotesStore(getNotesFromSnapshot(data));
      },
    }
  );

  const data = useMemo(() => {
    if (!snapshot) return [];
    if (!user?.uid) return [];
    return getNotesFromSnapshot(snapshot);
  }, [snapshot, user?.uid]);

  return { data };
}
