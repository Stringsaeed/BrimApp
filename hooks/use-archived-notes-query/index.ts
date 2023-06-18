import database from "@react-native-firebase/database";

import { useAuth } from "contexts/auth";
import { useDatabaseSnapshot } from "hooks/use-database-snapshot";

export default function useArchivedNotesQuery() {
  const { user } = useAuth();
  const ref = database()
    .ref(`/notes/${user?.uid}`)
    .orderByChild("is_archived")
    .equalTo(true);

  return useDatabaseSnapshot(["archived-notes"], ref, { subscribe: true });
}
