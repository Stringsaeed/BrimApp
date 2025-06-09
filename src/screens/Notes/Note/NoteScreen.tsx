import { useHeaderHeight } from "@react-navigation/elements";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { FormikProvider } from "formik";
import React from "react";
import { Keyboard, type TextInput } from "react-native";
import { Separator, YStack } from "tamagui";

import {
  Composer,
  DateText,
  NoteAutoSave,
  NoteHeaderRight,
  NoteTitleInput,
  NoteToolbox,
} from "@/components";
import type { ComposerRef } from "@/components/composer/types";
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
  const richTextRef = React.useRef<ComposerRef>(null);

  const router = useRouter();
  const { id: idParam } = useGlobalSearchParams();
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
    if (!richTextRef.current || !titleInputRef.current) {
      return Keyboard.dismiss();
    }

    if (richTextRef.current?.isFocused()) {
      richTextRef.current?.blur();
    }

    if (titleInputRef.current?.isFocused()) {
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
      <YStack backgroundColor="$background" paddingTop={headerHeight} flex={1}>
        <DateText date={note?.updated_at} />
        <NoteTitleInput ref={titleInputRef} />
        <Separator />
        <Composer ref={richTextRef} />
        <NoteToolbox onOpen={onToolboxSheetOpen} />
      </YStack>
    </FormikProvider>
  );
}
