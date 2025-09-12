import { useHeaderHeight } from "@react-navigation/elements";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FormikProvider } from "formik";
import React from "react";
import { type TextInput } from "react-native";
import { EnrichedTextInputInstance } from "react-native-enriched";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Separator, YStack } from "tamagui";

import {
  Composer,
  DateText,
  NoteAutoSave,
  NoteHeaderRight,
  NoteTitleInput,
  NoteToolbox,
} from "@/components";
import {
  useCreateEmptyNoteMutation,
  useDeleteNoteMutation,
  useNavigateProfile,
  useNoteForm,
  useNotePrivacyMutation,
} from "@/hooks";
import { NoteService } from "@/services";

export default function NoteView() {
  const titleInputRef = React.useRef<TextInput>(null);
  const composerRef = React.useRef<EnrichedTextInputInstance>(null);

  const router = useRouter();
  const { id: idParam } = useLocalSearchParams();
  const id = idParam as string;
  const note = NoteService.get(id);

  // UI hooks
  const headerHeight = useHeaderHeight();

  // Logic hooks
  const onNavigateProfile = useNavigateProfile();
  const deleteNoteMutation = useDeleteNoteMutation();
  const notePrivacyMutation = useNotePrivacyMutation();
  const createEmptyNoteMutation = useCreateEmptyNoteMutation();
  const config = useNoteForm(note);

  const togglePrivacy = () => {
    if (!note) return;
    notePrivacyMutation.mutate({ note });
  };

  const handleDelete = async () => {
    if (!note) return;
    await deleteNoteMutation.mutateAsync(note);
    router.back();
  };

  const onToolboxSheetOpen = () => {
    composerRef.current?.blur();

    if (titleInputRef.current?.isFocused()) {
      titleInputRef.current?.blur();
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <FormikProvider value={config}>
        <NoteHeaderRight
          onPressLock={togglePrivacy}
          onPressTrash={handleDelete}
          isPrivate={note?.is_private}
          onPressPlus={createEmptyNoteMutation.mutate}
          onPressProfile={onNavigateProfile}
        />
        <NoteAutoSave />
        <YStack
          backgroundColor="$background"
          paddingTop={headerHeight}
          flex={1}
        >
          <DateText date={note?.updated_at} />
          <NoteTitleInput ref={titleInputRef} />
          <Separator />
          <Composer ref={composerRef} />
          <NoteToolbox onOpen={onToolboxSheetOpen} />
        </YStack>
      </FormikProvider>
    </KeyboardAvoidingView>
  );
}
