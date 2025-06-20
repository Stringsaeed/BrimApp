import { FormikHelpers, useFormik } from "formik";
import { useCallback, useEffect } from "react";

import useUpdateNoteMutation from "@/hooks/use-update-note-mutation";
import { Sentry } from "@/services";
import { Note } from "@/types";

export interface NoteFormValues {
  note: string;
  title: string;
}

export default function useNoteForm(note: Note) {
  const updateNoteMutation = useUpdateNoteMutation();

  const onSubmit = useCallback(
    (
      values: NoteFormValues,
      { setSubmitting }: FormikHelpers<NoteFormValues>
    ) => {
      if (!note) return;
      setSubmitting(true);
      try {
        updateNoteMutation.mutate({
          status:
            note.status === "draft"
              ? "published"
              : (note.status as Note["status"]),
          title: values.title,
          note: values.note,
          id: note.id,
        });
      } catch (e) {
        Sentry.captureException(e);
      }
      setSubmitting(false);
    },
    [note, updateNoteMutation]
  );

  const config = useFormik<NoteFormValues>({
    initialValues: { title: note?.title ?? "", note: note?.note ?? "" },
    enableReinitialize: false,
    onSubmit,
  });

  useEffect(() => {
    return () => {
      if (!note) return;
      const isDirty = config.dirty;
      const isSubmittedBefore = config.submitCount > 0;
      const isEmptyNote = config.values.note === "";

      if (isEmptyNote && !isSubmittedBefore && !isDirty) {
        void config.submitForm();
      }
    };
  }, [config, note]);

  return config;
}
