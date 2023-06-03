import { useEffect, useState } from "react";
import database from "@react-native-firebase/database";

import { useAuth } from "contexts/auth";
import { Note } from "types";

import { notesSchema } from "./schema";

export default function useNotesQuery() {
  const [data, setData] = useState<Note[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uid) return;
    const notesRef = database().ref(`/notes/${user?.uid}`);

    notesRef.on("value", (snapshot) => {
      const notes: Record<
        string,
        {
          note?: string | null;
          created_at?: string | null;
          is_draft?: boolean | null;
          user?: string | null;
        }
      > = snapshot.val();

      if (!notes) {
        return setData([]);
      }

      const notesArray = Object.entries(notes).map(([id, note]) => ({
        ...note,
        note: note.note ?? "",
        id,
        user: user.uid,
      }));

      setData(notesSchema.parse(notesArray));
    });

    return () => notesRef.off();
  }, [user]);

  return { data };
}
