import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "tamagui";
import { RichEditor } from "react-native-pell-rich-editor";
import database from "@react-native-firebase/database";
import { Formik } from "formik";

import { AutoSave, Composer } from "components";
import { noteSchema } from "hooks/use-notes-query/schema";

async function updateNote(text: string = "", userId: string, noteId: string) {
  await database().ref(`/notes/${userId}/${noteId}`).update({
    note: text,
    is_draft: false,
  });
}

export default function NotePage() {
  const params = useLocalSearchParams();
  const { note: stringifiedNote } = params;
  const note = noteSchema.parse(JSON.parse(stringifiedNote as string));
  const richTextRef = React.useRef<RichEditor>(null);

  return (
    <Formik
      initialValues={{ note: note.note }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await updateNote(values.note, note.user!, note.id);
        setSubmitting(false);
      }}
    >
      {({ handleChange }) => (
        <Stack flex={1} bg="beige">
          <AutoSave />
          <Composer
            ref={richTextRef}
            onUserInput={handleChange("note")}
            onLoadEnd={() => {
              if (note.note) richTextRef.current?.insertHTML(note.note);

              richTextRef.current?.focusContentEditor();
            }}
          />
        </Stack>
      )}
    </Formik>
  );
}
