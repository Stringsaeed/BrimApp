import { useMutation } from "@tanstack/react-query";

import { NoteService, Sentry } from "services";
import { NoteSchema, RequiredNotNull } from "types";

type RequiredInput = RequiredNotNull<Required<Pick<NoteSchema, "id">>>;

type OptionalInput = Partial<
  Omit<NoteSchema, "id" | "user_id" | "updated_at" | "created_at">
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
      Sentry.captureException(error, {
        extra: { variables, context },
      });
    },
  });
}
