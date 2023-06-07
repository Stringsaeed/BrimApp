import React, { useCallback, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { RichEditor } from "react-native-pell-rich-editor";
import database from "@react-native-firebase/database";
import { Formik, FormikHelpers } from "formik";
import * as LocalAuthentication from "expo-local-authentication";
import { View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

import { AutoSave, Composer, NoteHeaderRight } from "components";
import { useNotesContext } from "contexts";
import { theme } from "themes";

interface FormValues {
  note: string;
}

async function updateNote(text: string = "", userId: string, noteId: string) {
  await database().ref(`/notes/${userId}/${noteId}`).update({
    note: text,
    is_draft: false,
  });
}

export default function NotePage() {
  const { id } = useLocalSearchParams();
  const { notes } = useNotesContext();
  const selectedNote = notes.find((note) => note.id === id);

  const [note, setNote] = useState(() => selectedNote!);
  const richTextRef = React.useRef<RichEditor>(null);

  const headerHeight = useHeaderHeight();

  const handleSetPrivate = async () => {
    let isPrivate = note.is_private;
    if (isPrivate) {
      isPrivate = false;
    } else {
      const result = await LocalAuthentication.authenticateAsync({
        disableDeviceFallback: true,
      });
      if (!result.success) {
        return;
      }
      isPrivate = true;
    }
    if (isPrivate === note.is_private) return;
    await database().ref(`/notes/${note.user!}/${note.id!}`).update({
      is_private: isPrivate,
    });
    setNote((_note) => ({
      ..._note,
      is_private: isPrivate,
    }));
  };

  const handleSubmit = useCallback(
    async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      setSubmitting(true);
      await updateNote(values.note, note.user!, note.id);
      setSubmitting(false);
    },
    [note.id, note.user]
  );

  return (
    <>
      <NoteHeaderRight
        onPressLock={handleSetPrivate}
        isPrivate={note.is_private}
      />
      <Formik
        enableReinitialize
        initialValues={{ note: note.note }}
        onSubmit={handleSubmit}
      >
        {({ handleChange }) => (
          <View
            style={{
              flex: 1,
              paddingTop: headerHeight,
              backgroundColor: theme.colors.background,
            }}
          >
            <AutoSave />
            <Composer
              ref={richTextRef}
              onUserInput={handleChange("note")}
              onLoadEnd={() => {
                if (note.note) richTextRef.current?.insertHTML(note.note);

                richTextRef.current?.focusContentEditor();
              }}
            />
          </View>
        )}
      </Formik>
    </>
  );
}
