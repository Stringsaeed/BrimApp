import { useAuth } from "contexts/auth";
import useCreateNoteMutation from "hooks/use-create-note-mutation";
import useNavigateNote from "hooks/use-navigate-note";

export default function useCreateEmptyNoteMutation() {
  const { user } = useAuth();
  const onNavigateNote = useNavigateNote();

  const createNoteMutation = useCreateNoteMutation();
  const onCreateEmptyNote = async () => {
    const now = new Date().toISOString();

    const note = await createNoteMutation.mutateAsync({
      user: user?.uid ?? null,
      is_archived: false,
      is_private: false,
      is_trashed: false,
      updated_at: now,
      created_at: now,
      is_draft: true,
      title: "",
      note: "",
    });

    onNavigateNote(note);
  };

  return onCreateEmptyNote;
}
