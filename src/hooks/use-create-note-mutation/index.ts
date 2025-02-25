import { useMutation } from "@tanstack/react-query";

import { NoteService } from "services";
import { Note } from "types";

function createNote(input: Omit<Note, "id">): Promise<Note> {
  return Promise.resolve(NoteService.create(input));
}

export default function useCreateNoteMutation() {
  return useMutation({ mutationFn: createNote });
}
