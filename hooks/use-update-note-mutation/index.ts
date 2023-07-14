import database from "@react-native-firebase/database";
import { useMutation } from "@tanstack/react-query";

import { Note, RequiredNotNull } from "types";

type RequiredInput = RequiredNotNull<Required<Pick<Note, "id" | "user">>>;

type OptionalInput = Partial<
  Omit<Note, "id" | "user" | "updated_at" | "created_at">
>;

export type UpdateNoteMutationInput = RequiredInput & OptionalInput;

async function updateNote(input: UpdateNoteMutationInput) {
  const { user, id, ...note } = input;
  const now = new Date().toISOString();
  await database()
    .ref(`/notes/${user}/${id}`)
    .update({
      ...note,
      updated_at: now,
      is_draft: false,
    });
}

export default function useUpdateNoteMutation() {
  return useMutation(updateNote);
}
