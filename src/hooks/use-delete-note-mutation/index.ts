import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

import useUpdateNoteMutation from "hooks/use-update-note-mutation";
import { NoteService } from "services";
import { Note } from "types";

export default function useDeleteNoteMutation() {
  const updateNoteMutation = useUpdateNoteMutation();

  const onTrash = useCallback(
    async (input: Note) => {
      if (input.is_trashed || input.status === "trashed") {
        return await NoteService.delete(input.id);
      }

      await updateNoteMutation.mutateAsync({
        status: "trashed",
        user: input.user!,
        is_trashed: true,
        id: input.id!,
      });
    },
    [updateNoteMutation]
  );

  return useMutation(onTrash);
}
