import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

import useCreateNoteMutation from "hooks/use-create-note-mutation";
import useNavigateNote from "hooks/use-navigate-note";
import { Note } from "types";

export default function useCreateEmptyNoteMutation() {
  const onNavigateNote = useNavigateNote();
  const createNoteMutation = useCreateNoteMutation();

  const createEmptyNoteMutation = useCallback(async () => {
    return await createNoteMutation.mutateAsync({
      is_private: false,
      status: "draft",
      title: "",
      note: "",
    });
  }, [createNoteMutation]);

  const onSuccess = (data: Note) => {
    void onNavigateNote(data);
  };

  return useMutation({ mutationFn: createEmptyNoteMutation, onSuccess });
}
