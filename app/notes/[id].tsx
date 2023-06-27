import { useLocalSearchParams, useRouter } from "expo-router";
import { FormikProvider } from "formik";
import React from "react";
import { View, ViewStyle } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";

import { AutoSave, Composer, NoteHeaderRight } from "components";
import {
  useCreateEmptyNoteMutation,
  useDeleteNoteMutation,
  useInMemoryNotes,
  useNavigateProfile,
  useNoteForm,
  useNotePrivacyMutation,
} from "hooks";
import { theme } from "themes";

export default function NotePage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const onCreateEmptyNote = useCreateEmptyNoteMutation();
  const deleteNoteMutation = useDeleteNoteMutation();
  const onNavigateProfile = useNavigateProfile();
  const notes = useInMemoryNotes();
  const note = notes.find((note) => note.id === id);
  const config = useNoteForm(note!);

  const notePrivacyMutation = useNotePrivacyMutation();

  const richTextRef = React.useRef<RichEditor>(null);

  const togglePrivacy = async () => {
    if (!note) return;
    notePrivacyMutation.mutate({ note });
  };

  const handleDelete = async () => {
    if (!note) return;
    await deleteNoteMutation.mutate(note);
    router.back();
  };

  return (
    <FormikProvider value={config}>
      <NoteHeaderRight
        onPressLock={togglePrivacy}
        onPressTrash={handleDelete}
        isPrivate={note?.is_private}
        onPressPlus={onCreateEmptyNote}
        onPressProfile={onNavigateProfile}
      />
      <View style={container}>
        <AutoSave />
        <Composer
          ref={richTextRef}
          onUserInput={config.handleChange("note")}
          onTitleChange={config.handleChange("title")}
          title={config.values.title}
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
