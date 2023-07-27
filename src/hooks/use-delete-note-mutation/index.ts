import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

import useUpdateNoteMutation from "hooks/use-update-note-mutation";
import { Note } from "types";

export default function useDeleteNoteMutation() {
  const updateNoteMutation = useUpdateNoteMutation();

  const onTrash = useCallback(
    async (input: Note) => {
      await updateNoteMutation.mutateAsync({
        user: input.user!,
        is_trashed: true,
        id: input.id!,
      });
    },
    [updateNoteMutation]
  );

  return useMutation(onTrash);
}
