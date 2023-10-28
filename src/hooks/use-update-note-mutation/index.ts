import { useMutation } from "@tanstack/react-query";

import { NoteService, Sentry } from "services";
import { Note, RequiredNotNull } from "types";

type RequiredInput = RequiredNotNull<Required<Pick<Note, "id" | "user_id">>>;

type OptionalInput = Partial<
  Omit<Note, "id" | "user_id" | "updated_at" | "created_at">
>;

export type UpdateNoteMutationInput = RequiredInput & OptionalInput;

async function updateNote(input: UpdateNoteMutationInput) {
  const { id, ...note } = input;
  const now = new Date().toISOString();
  await NoteService.update(id, {
    ...note,
    status: input.status === "draft" ? "published" : input.status,
    updated_at: now,
  });
}

export default function useUpdateNoteMutation() {
  return useMutation(updateNote, {
    onError(error, variables, context) {
      Sentry.Native.captureException(error, {
        extra: { variables, context },
      });
    },
  });
}
