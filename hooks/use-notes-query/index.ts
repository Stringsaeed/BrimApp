import database from "@react-native-firebase/database";
import { useMemo } from "react";

import { useAuth } from "contexts/auth";
import { useDatabaseSnapshot } from "hooks/use-database-snapshot";

import { notesSchema } from "./schema";

export default function useNotesQuery() {
  const { user } = useAuth();
  const { data: snapshot } = useDatabaseSnapshot(
    ["notes"],
    database()
      .ref(`/notes/${user?.uid}`)
      .orderByChild("is_archived")
      .equalTo(false),
    { subscribe: true }
  );
  const data = useMemo(() => {
    if (!snapshot) return [];
    if (!user?.uid) return [];

    const notes: Record<
      string,
      {
        note?: string | null;
        created_at?: string | null;
        is_draft?: boolean | null;
        user?: string | null;
        updated_at?: string | null;
      }
    > | null = snapshot.val();

    if (!notes) return [];

    const notesArray = Object.entries(notes)
      .map(([id, note]) => ({
        ...note,
        note: note.note ?? "",
        user: user?.uid,
        id,
      }))
      .sort((a, b) => {
        if (!a.updated_at) return 1;
        if (!b.updated_at) return -1;
        return a.updated_at > b.updated_at ? -1 : 1;
      });

    return notesSchema.parse(notesArray);
  }, [snapshot, user?.uid]);

  return { data };
}
