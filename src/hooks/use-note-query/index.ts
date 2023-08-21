import { useQuery } from "@tanstack/react-query";
import { usePathname } from "expo-router";

import { useAuth } from "contexts/auth";
import { NoteService } from "services";

async function fetchNote(id: string) {
  return NoteService.get(id);
}

export default function useNoteQuery() {
  const pathname = usePathname();
  const noteId = pathname.split("/")[2];
  const { user } = useAuth();
  const userId = user?.uid;

  const noteQuery = useQuery(
    ["note", noteId, user?.uid],
    async () => await fetchNote(noteId),
    {
      enabled: !!userId && !!noteId,
    }
  );

  return { ...noteQuery, noteId, userId };
}
