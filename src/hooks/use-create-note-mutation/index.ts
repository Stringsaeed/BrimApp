import { useMutation } from "@tanstack/react-query";

import { NoteService } from "services";
import { Note } from "types";

async function createNote(input: Omit<Note, "id">) {
  return await NoteService.create(input);
}

export default function useCreateNoteMutation() {
  return useMutation(createNote);
}
