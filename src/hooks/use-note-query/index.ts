import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "contexts/auth";
import { RootStackScreenProps, Routes } from "routers";
import { NoteService } from "services";

async function fetchNote(id: string) {
  return NoteService.get(id);
}

export default function useNoteQuery() {
  const route = useRoute<RootStackScreenProps<Routes.Note>["route"]>();
  const noteId = route.params.id;
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
