import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FormikProvider } from "formik";
import React from "react";
import { TextInput } from "react-native";
import { YStack } from "tamagui";

import { AutoSave, Composer, NoteHeaderRight } from "components";
import { useNotesContext } from "contexts";
import {
  useCreateEmptyNoteMutation,
  useDeleteNoteMutation,
  useNavigateProfile,
  useNoteForm,
  useNotePrivacyMutation,
} from "hooks";
import { RootStackScreenProps } from "routers";

export default function NotePage() {
  const navigation = useNavigation();
  const {
    params: { id },
  } = useRoute<RootStackScreenProps<"Note">["route"]>();
  const headerHeight = useHeaderHeight();
  const onCreateEmptyNote = useCreateEmptyNoteMutation();
  const deleteNoteMutation = useDeleteNoteMutation();

  const onNavigateProfile = useNavigateProfile();
  const { notes } = useNotesContext();
  const note = notes.find((note) => note.id === id);
  const config = useNoteForm(note!);

  const notePrivacyMutation = useNotePrivacyMutation();

  const richTextRef = React.useRef<TextInput>(null);

  const togglePrivacy = async () => {
    if (!note) return;
    notePrivacyMutation.mutate({ note });
  };

  const handleDelete = async () => {
    if (!note) return;
    await deleteNoteMutation.mutate(note);
    navigation.goBack();
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
      <YStack pt={headerHeight} flex={1} bg="$background">
        <AutoSave id={id} />
        <Composer
          note={config.values.note}
          ref={richTextRef}
          onUserInput={config.handleChange("note")}
          onTitleChange={config.handleChange("title")}
          title={config.values.title}
        />
      </YStack>
    </FormikProvider>
  );
}
