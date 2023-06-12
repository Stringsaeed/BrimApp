import React, { useCallback, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { RichEditor } from "react-native-pell-rich-editor";
import database from "@react-native-firebase/database";
import { FormikHelpers, FormikProvider, useFormik } from "formik";
import { View, ViewStyle } from "react-native";
import { AutoSave, Composer, NoteHeaderRight } from "components";
import { useNotesContext } from "contexts";
import { theme } from "themes";
import { useNotePrivacyMutation } from "hooks";

interface FormValues {
  note: string;
}

async function updateNote(text: string = "", userId: string, noteId: string) {
  await database().ref(`/notes/${userId}/${noteId}`).update({
    is_draft: false,
    note: text,
  });
}

export default function NotePage() {
  const { id } = useLocalSearchParams();
  const { notes } = useNotesContext();
  const note = notes.find((note) => note.id === id);

  const notePrivacyMutation = useNotePrivacyMutation();

  const richTextRef = React.useRef<RichEditor>(null);

  const onSubmit = useCallback(
    async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      if (!note) return;
      setSubmitting(true);
      await updateNote(values.note, note.user!, note.id);
      setSubmitting(false);
    },
    [note]
  );
  const config = useFormik<FormValues>({
    initialValues: { note: note?.note ?? "" },
    onSubmit,
  });

  const togglePrivacy = useCallback(async () => {
    if (!note) return;
    notePrivacyMutation.mutate({ note });
  }, [notePrivacyMutation, note]);

  const handleDelete = useCallback(async () => {
    if (!note) return;
    await database().ref(`/notes/${note.user}/${note.id}`).remove();
  }, [note]);

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

  return (
    <FormikProvider value={config}>
      <NoteHeaderRight
        onPressLock={togglePrivacy}
        onPressTrash={handleDelete}
        isPrivate={note?.is_private}
      />
      <View style={container}>
        <AutoSave />
        <Composer
          ref={richTextRef}
          onUserInput={config.handleChange("note")}
          onLoadEnd={() => {
            if (note?.note) richTextRef.current?.insertHTML(note.note);

            richTextRef.current?.focusContentEditor();
          }}
        />
      </View>
    </FormikProvider>
  );
}

const container: ViewStyle = {
  backgroundColor: theme.colors.background,
  flex: 1,
};
