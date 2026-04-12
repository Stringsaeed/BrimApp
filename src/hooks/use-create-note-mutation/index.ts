import { useMutation } from "@tanstack/react-query";
import { NoteService } from "@/services/notes/notes";
import { Note } from "@/types/notes";

function createNote(input: Omit<Note, "id">): Promise<Note> {
  return Promise.resolve(NoteService.create(input));
}

export default function useCreateNoteMutation() {
  return useMutation({ mutationFn: createNote });
}
