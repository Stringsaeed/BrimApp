import database, {
  FirebaseDatabaseTypes,
} from "@react-native-firebase/database";

import { useAuth } from "contexts/auth";
import { useDatabaseSnapshot } from "hooks/use-database-snapshot";
import { Note, notesSchema } from "types";

function refineSnapshot(snapshot: FirebaseDatabaseTypes.DataSnapshot): Note[] {
  const snapshotValue = snapshot.val();
  if (!snapshotValue) {
    return [];
  }
  const data: unknown[] = [];
  snapshot.forEach((snapshot) => {
    data.push({
      ...snapshot.val(),
      id: snapshot.key,
    });
    return undefined;
  });

  const notes = notesSchema.parse(data).reverse();
  return notes;
}

export default function useNotesQuery() {
  const { user } = useAuth();
  const userId = user?.uid;
  const ref = database().ref(`/notes/${userId}`).orderByChild("updated_at");
  return useDatabaseSnapshot(
    ["notes-changes"],
    ref,
    { subscribe: true },
    {
      select(data) {
        return refineSnapshot(data);
      },
      enabled: !!userId,
    }
  );
}
