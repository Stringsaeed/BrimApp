import { FormikHelpers, useFormik } from "formik";
import { useCallback, useEffect } from "react";

import useUpdateNoteMutation from "hooks/use-update-note-mutation";
import { Note } from "types";

export interface NoteFormValues {
  note: string;
  title: string;
}

export default function useNoteForm(note: Note) {
  const updateNoteMutation = useUpdateNoteMutation();

  const onSubmit = useCallback(
    async (
      values: NoteFormValues,
      { setSubmitting }: FormikHelpers<NoteFormValues>
    ) => {
      if (!note) return;
      setSubmitting(true);
      await updateNoteMutation.mutate({
        title: values.title,
        note: values.note,
        user: note.user!,
        is_draft: false,
        id: note.id,
      });
      setSubmitting(false);
    },
    [note, updateNoteMutation]
  );

  const config = useFormik<NoteFormValues>({
    initialValues: { title: note?.title ?? "", note: note?.note ?? "" },
    onSubmit,
  });

  useEffect(() => {
    return () => {
      if (!note) return;
      const isDirty = config.dirty;
      const isSubmittedBefore = config.submitCount > 0;
      const isEmptyNote = config.values.note === "";

      if (isEmptyNote && !isSubmittedBefore && !isDirty) {
        config.submitForm();
      }
    };
  }, [config, note]);

  return config;
}
