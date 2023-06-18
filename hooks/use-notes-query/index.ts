import database from "@react-native-firebase/database";
import { useEffect, useState } from "react";

import { useAuth } from "contexts/auth";
import { Note } from "types";

import { notesSchema } from "./schema";

export default function useNotesQuery() {
  const [data, setData] = useState<Note[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uid) return;
    const notesRef = database()
      .ref(`/notes/${user?.uid}`)
      .orderByChild("is_archived")
      .equalTo(false);

    notesRef.on("value", (snapshot) => {
      const notes: Record<
        string,
        {
          note?: string | null;
          created_at?: string | null;
          is_draft?: boolean | null;
          user?: string | null;
          updated_at?: string | null;
        }
      > = snapshot.val();

      if (!notes) {
        return setData([]);
      }

      const notesArray = Object.entries(notes)
        .map(([id, note]) => ({
          ...note,
          note: note.note ?? "",
          user: user.uid,
          id,
        }))
        .sort((a, b) => {
          if (!a.updated_at) return 1;
          if (!b.updated_at) return -1;
          return a.updated_at > b.updated_at ? -1 : 1;
        });

      setData(notesSchema.parse(notesArray));
    });

    return () => notesRef.off();
  }, [user]);

  return { setData, data };
}
