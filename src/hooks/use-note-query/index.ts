import database from "@react-native-firebase/database";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "expo-router";

import { useAuth } from "contexts/auth";
import { noteSchema } from "types";

async function fetchNote(id: string, userId: string) {
  const ref = database().ref(`/notes/${userId}/${id}`);
  const snapshot = await ref.once("value");
  const snapshotValue = snapshot.val();
  return noteSchema.parse({
    ...snapshotValue,
    id: snapshot.key,
    user: userId,
  });
}

export default function useNoteQuery() {
  const pathname = usePathname();
  const noteId = pathname.split("/")[2];
  const { user } = useAuth();
  const userId = user?.uid;

  const noteQuery = useQuery(
    ["note", noteId, user?.uid],
    async () => await fetchNote(noteId, userId!),
    {
      enabled: !!userId && !!noteId,
    }
  );

  return { ...noteQuery, noteId, userId };
}
