import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { format, parseISO } from "date-fns";
import { FormikProvider } from "formik";
import React from "react";
import { Keyboard, TextInput } from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Separator, SizableText, YStack } from "tamagui";

import {
  AutoSave,
  Composer,
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
    await deleteNoteMutation.mutate(note);
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
      <AutoSave />
      <Animated.View style={stylez}>
        <YStack
          backgroundColor="$background"
          paddingTop={headerHeight}
          flex={1}
        >
          <SizableText textAlign="center" size="$1">
            {note?.updated_at && format(parseISO(note?.updated_at), "PP")}
          </SizableText>
          <NoteTitleInput ref={titleInputRef} />
          <Separator />
          <Composer ref={richTextRef} />
          <NoteToolbox onOpen={onToolboxSheetOpen} />
        </YStack>
      </Animated.View>
    </FormikProvider>
  );
}
