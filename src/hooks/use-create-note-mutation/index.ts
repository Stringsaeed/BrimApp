import { useMutation } from "@tanstack/react-query";

import { NoteService } from "services";
import { NoteSchema } from "types";

async function createNote(input: Omit<NoteSchema, "id">) {
  return await NoteService.create(input);
}

export default function useCreateNoteMutation() {
  return useMutation(createNote);
}
