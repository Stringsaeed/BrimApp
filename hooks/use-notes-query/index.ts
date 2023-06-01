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
      const notes = snapshot.val();
      if (!notes) return;

      const notesArray = Object.entries(notes).map(([id, note]) => ({
        // @ts-expect-error
        ...note,
        id,
        user: user.uid,
      }));

      setData(notesSchema.parse(notesArray));
    });

    return () => notesRef.off();
  }, [user]);

  return { data };
}
