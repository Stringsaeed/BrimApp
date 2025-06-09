import { useFormikContext } from "formik";

import { NoteFormValues } from "@/hooks/use-note-form";

export default function useNoteComposer() {
  const { handleChange, handleBlur, values } =
    useFormikContext<NoteFormValues>();

  return {
    onChangeText: handleChange("note"),
    onBlur: handleBlur("note"),
    value: values.note,
  };
}
