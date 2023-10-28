import { Archive, X, Trash2 } from "@tamagui/lucide-icons";
import React from "react";
import { Alert } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  Circle,
  SizableText,
  Spacer,
  View,
  XGroup,
  XStack,
} from "tamagui";

import { useNotesList } from "contexts";
import { useHapticCallback } from "hooks";

export default function NoteListMultiselectMenu() {
  const { bottom } = useSafeAreaInsets();
  const {
    toggleMultiSelectMode,
    multiSelectMode,
    selectedNotes,
    deleteNote,
    notes,
  } = useNotesList();

  // TODO: Implement this
  const notImplementedFn = () => {
    Alert.alert("Not implemented");
  };

  const onTrash = useHapticCallback(
    () => {
      selectedNotes
        .map((selectedNoteId) =>
          notes.find((note) => note.id === selectedNoteId)
        )
        .filter((note) => note)
        .forEach((note) => {
          if (!note) {
            return;
          }
          deleteNote?.(note);
        });
    },
    { feedbackType: "success" }
  );

  const onClose = useHapticCallback(
    () => {
      toggleMultiSelectMode?.();
    },
    { feedbackType: "medium" }
  );

  if (!multiSelectMode) {
    return <></>;
  }

  return (
    <Animated.View exiting={FadeOut} entering={FadeIn}>
      <XStack
        pb={bottom + 8}
        pt="$2"
        px="$4"
        borderTopWidth={1}
        borderColor="$gray4"
        alignItems="center"
      >
        <Circle size="$2" bg="$gray4" />
        <SizableText>{selectedNotes.length} Selected</SizableText>
        <Spacer flex={1} />
        <XGroup>
          <XGroup.Item>
            <Button onPress={notImplementedFn} icon={Archive} circular />
          </XGroup.Item>
          <XGroup.Item>
            <Button onPress={onTrash} icon={Trash2} circular />
          </XGroup.Item>
          <View height="100%" bg="$color" borderLeftWidth={1} />
          <XGroup.Item>
            <Button icon={X} circular onPress={onClose} />
          </XGroup.Item>
        </XGroup>
      </XStack>
    </Animated.View>
  );
}
