import {
  Archive,
  X,
  Trash2,
  CircleDot,
  Circle,
  CircleDotDashed,
} from "@tamagui/lucide-icons";
import React from "react";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  SizableText,
  Spacer,
  Stack,
  View,
  XGroup,
  XStack,
} from "tamagui";

import { useNotesList } from "contexts";
import { useHapticCallback, useUserAccent } from "hooks";

export default function NoteListMultiselectMenu() {
  const { accent } = useUserAccent();
  const { bottom } = useSafeAreaInsets();
  const {
    toggleMultiSelectMode,
    multiSelectMode,
    selectedNotes,
    onNoteSelect,
    archiveNote,
    deleteNote,
    notes,
  } = useNotesList();

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

  const onArchive = useHapticCallback(
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
          archiveNote?.(note.id);
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

  const noOfSelectedNotes = selectedNotes.length;
  const noOfNotes = notes.length;

  const renderSelectedIndicatorIcon = () => {
    const shared = {
      size: 24,
    };
    switch (true) {
      case noOfSelectedNotes === 0:
        return (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Circle {...shared} color="$gray6" />
          </Animated.View>
        );
      case noOfSelectedNotes === noOfNotes:
        return (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <CircleDot {...shared} color={`$${accent}`} />
          </Animated.View>
        );
      default:
        return (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <CircleDotDashed {...shared} color="$gray10" />
          </Animated.View>
        );
    }
  };

  const handleSelectAll = () => {
    const selectedNotesIds = new Array(...selectedNotes.map((n) => n));

    if (noOfSelectedNotes === 0) {
      return notes.forEach((note) => {
        onNoteSelect?.(note.id);
      });
    }

    if (noOfSelectedNotes === noOfNotes) {
      return selectedNotesIds.forEach((noteId) => {
        onNoteSelect?.(noteId);
      });
    }

    notes
      .filter((note) => !selectedNotesIds.includes(note.id))
      .forEach((note) => {
        onNoteSelect?.(note.id);
      });
  };

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
        <Stack onPress={handleSelectAll}>
          <Animated.View
            layout={LinearTransition.easing(Easing.inOut(Easing.ease))}
          >
            {renderSelectedIndicatorIcon()}
          </Animated.View>
        </Stack>
        <Spacer size="$2" />
        <SizableText fontVariant={["tabular-nums"]}>
          {selectedNotes.length} Selected
        </SizableText>
        <Spacer flex={1} />
        <XGroup>
          <XGroup.Item>
            <Button onPress={onArchive} icon={Archive} circular />
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
