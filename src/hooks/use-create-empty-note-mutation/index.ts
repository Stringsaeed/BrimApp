import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

import { useAuth } from "contexts/auth";
import useCreateNoteMutation from "hooks/use-create-note-mutation";
import useNavigateNote from "hooks/use-navigate-note";
import { Note } from "types";

export default function useCreateEmptyNoteMutation() {
  const { user } = useAuth();
  const onNavigateNote = useNavigateNote();
  const createNoteMutation = useCreateNoteMutation();

  const createEmptyNoteMutation = useCallback(async () => {
    if (!user?.uid) {
      throw new Error("User not found");
    }

    const now = new Date().toISOString();

    return await createNoteMutation.mutateAsync({
      user_id: user?.uid ?? undefined,
      is_private: false,
      status: "draft",
      created_at: now,
      updated_at: now,
      title: "",
      note: "",
    });
  }, [createNoteMutation, user?.uid]);

  const onSuccess = (data: Note) => {
    onNavigateNote(data);
  };

  return useMutation(createEmptyNoteMutation, { onSuccess });
}
