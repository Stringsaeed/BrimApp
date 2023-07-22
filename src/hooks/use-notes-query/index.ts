import database from "@react-native-firebase/database";
import { useMemo } from "react";

import { useAuth } from "contexts/auth";
import { useDatabaseSnapshot } from "hooks/use-database-snapshot";
import { getNotesFromSnapshot } from "utils";

export default function useNotesQuery() {
  const { user } = useAuth();
  const { data: snapshot } = useDatabaseSnapshot(
    ["notes"],
    database().ref(`/notes/${user?.uid}`),
    { subscribe: true }
  );

  const data = useMemo(() => {
    if (!snapshot) return [];
    if (!user?.uid) return [];
    return getNotesFromSnapshot(snapshot);
  }, [snapshot, user?.uid]);

  return { data };
}
