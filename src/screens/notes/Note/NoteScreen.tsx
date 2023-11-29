import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FormikProvider } from "formik";
import React from "react";
import { Keyboard, TextInput } from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Separator, YStack } from "tamagui";

import {
  NoteAutoSave,
  Composer,
  DateText,
  NoteHeaderRight,
  NoteTitleInput,
  NoteToolbox,
} from "components";
import { ComposerRef } from "components/composer/types";
import { useNotesContext } from "contexts";
import {
  useCreateEmptyNoteMutation,
  useDeleteNoteMutation,
  useNavigateProfile,
  useNoteForm,
  useNotePrivacyMutation,
} from "hooks";
import { RootStackScreenProps, Routes } from "routers";

export default function NoteView() {
  const navigation = useNavigation();
  const {
    params: { id },
  } = useRoute<RootStackScreenProps<Routes.Note>["route"]>();
  const headerHeight = useHeaderHeight();
  const createEmptyNoteMutation = useCreateEmptyNoteMutation();
  const deleteNoteMutation = useDeleteNoteMutation();
  const { height } = useAnimatedKeyboard();
  const stylez = useAnimatedStyle(
    () => ({
      paddingBottom: height.value,
      flex: 1,
    }),
    [height]
  );

  const onNavigateProfile = useNavigateProfile();
  const { notes } = useNotesContext();
  const note = notes.find((note) => note.id === id);
  const config = useNoteForm(note!);

  const notePrivacyMutation = useNotePrivacyMutation();

  const titleInputRef = React.useRef<TextInput>(null);
  const richTextRef = React.useRef<ComposerRef>(null);

  const togglePrivacy = async () => {
    if (!note) return;
    notePrivacyMutation.mutate({ note });
  };

  const handleDelete = async () => {
    if (!note) return;
    await deleteNoteMutation.mutateAsync(note);
    navigation.goBack();
  };

  const onToolboxSheetOpen = () => {
    if (!richTextRef.current || !titleInputRef.current) {
      return Keyboard.dismiss();
    }

    if (richTextRef.current.isFocused()) {
      richTextRef.current?.blur();
    }

    if (titleInputRef.current.isFocused()) {
      titleInputRef.current?.blur();
    }
  };

  return (
    <FormikProvider value={config}>
      <NoteHeaderRight
        onPressLock={togglePrivacy}
        onPressTrash={handleDelete}
        isPrivate={note?.is_private}
        onPressPlus={createEmptyNoteMutation.mutate}
        onPressProfile={onNavigateProfile}
      />
      <NoteAutoSave />
      <Animated.View style={stylez}>
        <YStack
          backgroundColor="$background"
          paddingTop={headerHeight}
          flex={1}
        >
          <DateText date={note?.updated_at} />
          <NoteTitleInput ref={titleInputRef} />
          <Separator />
          <Composer ref={richTextRef} />
          <NoteToolbox onOpen={onToolboxSheetOpen} />
        </YStack>
      </Animated.View>
    </FormikProvider>
  );
}
