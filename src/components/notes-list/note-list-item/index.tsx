import {
  CheckCircle2,
  Circle,
  Trash2,
  Lock,
  Archive,
  ArchiveRestore,
  Undo,
} from "@tamagui/lucide-icons";
import React, { useCallback, useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";
import { ListItem, useTheme } from "tamagui";

import { useNotesList } from "contexts";
import { useUserAccent } from "hooks";
import { Note } from "types";
import { cipherTitle, getNoteTitle } from "utils";

import NoteListItemAction from "./action";
import NoteListItemContainer from "./container";

interface NoteListItemProps {
  item: Note;
  onPress: () => void;
  onRemove?: () => void;
  onLeftAction?: () => void;
}

export default function NoteListItemView({
  onLeftAction,
  onRemove,
  onPress,
  item,
}: NoteListItemProps) {
  const { accent } = useUserAccent();
  const { multiSelectMode, selectedNotes, onNoteSelect } = useNotesList();
  const theme = useTheme();
  const foregroundColor = theme.background.get();
  const content = useMemo(() => {
    const title = getNoteTitle(item.note);
    if (!item.is_private) return title;

    return cipherTitle(title);
  }, [item.is_private, item.note]);

  const renderRightActions = useCallback(() => {
    if (!onRemove) return null;
    return (
      <NoteListItemAction bg="$red10" onPress={onRemove} variant="right">
        <Trash2 size={24} color={foregroundColor} />
      </NoteListItemAction>
    );
  }, [foregroundColor, onRemove]);

  const renderLeftActions = useCallback(() => {
    if (!onLeftAction) return null;

    const isRestorable = ["trashed", "archived"].includes(item.status);

    const Icon =
      item.status === "archived"
        ? ArchiveRestore
        : item.status === "trashed"
          ? Undo
          : Archive;

    return (
      <NoteListItemAction
        bg={isRestorable ? "$green9" : "$yellow9"}
        onPress={onLeftAction}
        variant="left"
      >
        <Icon size={24} color={foregroundColor} />
      </NoteListItemAction>
    );
  }, [foregroundColor, item.status, onLeftAction]);

  const onSwipeableWillOpen = (direction: "left" | "right") => {
    if (direction === "left") {
      onLeftAction?.();
    } else if (direction === "right") {
      onRemove?.();
    }
  };

  const listItemTitle = (
    <ListItem.Text
      fontWeight={item.title ? "500" : "normal"}
      color={item.title ? `$${accent}` : "$gray7"}
      fontSize="$5"
      numberOfLines={1}
    >
      {item.title || "Draft"}
    </ListItem.Text>
  );

  const listItemIcon = multiSelectMode ? (
    selectedNotes.includes(item.id) ? (
      <CheckCircle2 size={24} color={`$${accent}`} />
    ) : (
      <Circle size={24} color="$gray6" />
    )
  ) : null;

  const tapGesture = Gesture.Tap()
    .onEnd(() => {
      if (multiSelectMode) return onNoteSelect(item.id);
      onPress();
    })
    .runOnJS(true);
  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      onNoteSelect(item.id);
    })
    .runOnJS(true);

  const gesture = Gesture.Exclusive(tapGesture, longPressGesture);

  return (
    <NoteListItemContainer
      gesture={gesture}
      onSwipeableWillOpen={onSwipeableWillOpen}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      enabled={!multiSelectMode}
    >
      <ListItem
        icon={listItemIcon}
        iconAfter={item.is_private ? <Lock /> : null}
        hoverTheme={false}
        pressTheme={false}
        subTitle={content}
        title={listItemTitle}
      />
    </NoteListItemContainer>
  );
}
