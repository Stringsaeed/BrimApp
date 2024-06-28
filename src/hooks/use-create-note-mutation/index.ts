import { useMutation } from "@tanstack/react-query";

import { NoteService } from "services";
import { Note } from "types";

async function createNote(input: Omit<Note, "id">) {
  return Promise.resolve(NoteService.create(input));
}

export default function useCreateNoteMutation() {
  return useMutation({ mutationFn: createNote });
}
