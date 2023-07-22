import { useAuth } from "contexts/auth";
import useCreateNoteMutation from "hooks/use-create-note-mutation";
import useNavigateNote from "hooks/use-navigate-note";
import { noteSchema } from "types";

export default function useCreateEmptyNoteMutation() {
  const { user } = useAuth();
  const onNavigateNote = useNavigateNote();

  const createNoteMutation = useCreateNoteMutation();
  const onCreateEmptyNote = async () => {
    const now = new Date().toISOString();

    const ref = await createNoteMutation.mutateAsync({
      user: user?.uid ?? null,
      is_archived: false,
      is_private: false,
      updated_at: now,
      created_at: now,
      is_draft: true,
      title: "",
      note: "",
    });
    const newNoteSnapshot = await ref.once("value");
    const note = noteSchema.parse({ ...newNoteSnapshot.val(), id: ref.key });
    onNavigateNote(note);
  };

  return onCreateEmptyNote;
}
