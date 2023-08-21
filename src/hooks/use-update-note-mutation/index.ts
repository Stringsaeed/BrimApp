import { useMutation } from "@tanstack/react-query";

import { NoteService } from "services";
import { Note, RequiredNotNull } from "types";

type RequiredInput = RequiredNotNull<Required<Pick<Note, "id" | "user">>>;

type OptionalInput = Partial<
  Omit<Note, "id" | "user" | "updated_at" | "created_at">
>;

export type UpdateNoteMutationInput = RequiredInput & OptionalInput;

async function updateNote(input: UpdateNoteMutationInput) {
  const { id, ...note } = input;
  const now = new Date().toISOString();
  await NoteService.update(id, {
    ...note,
    updated_at: now,
    is_draft: false,
  });
}

export default function useUpdateNoteMutation() {
  return useMutation(updateNote);
}
