import { ArchiveBox, ArrowUUpLeft, Lock, Trash } from "phosphor-react-native";
import React, { useCallback, useMemo } from "react";
import { Swipeable } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ListItem, useTheme } from "tamagui";
import { YGroup } from "tamagui";

import { Note } from "types";
import { cipherTitle, getNoteTitle } from "utils";

import NoteListItemAction from "./action";

export interface NoteListItemProps {
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
        <Trash color={foregroundColor} />
      </NoteListItemAction>
    );
  }, [foregroundColor, onRemove]);

  const renderLeftActions = useCallback(() => {
    if (!onLeftAction) return null;

    const isRestorable =
      item.is_archived ||
      item.is_trashed ||
      ["archived", "trashed"].includes(item.status);

    return (
      <NoteListItemAction
        bg={isRestorable ? "$green9" : "$yellow9"}
        onPress={onLeftAction}
        variant="left"
      >
        {isRestorable ? (
          <ArrowUUpLeft color={foregroundColor} />
        ) : (
          <ArchiveBox color={foregroundColor} />
        )}
      </NoteListItemAction>
    );
  }, [
    foregroundColor,
    item.is_archived,
    item.is_trashed,
    item.status,
    onLeftAction,
  ]);

  const onSwipeableWillOpen = (direction: "left" | "right") => {
    if (direction === "left") {
      onLeftAction?.();
    } else if (direction === "right") {
      onRemove?.();
    }
  };

  return (
    <Animated.View exiting={FadeOut} entering={FadeIn}>
      <YGroup.Item>
        <Swipeable
          onSwipeableWillOpen={onSwipeableWillOpen}
          renderRightActions={renderRightActions}
          renderLeftActions={renderLeftActions}
        >
          <ListItem
            iconAfter={item.is_private ? <Lock color="black" /> : null}
            onPress={onPress}
            hoverTheme
            pressTheme
            title={
              <ListItem.Text
                fontWeight={item.title ? "500" : "normal"}
                color={item.title ? "$accent" : "$grey6"}
                fontSize="$5"
                numberOfLines={1}
              >
                {item.title || "Draft"}
              </ListItem.Text>
            }
            subTitle={content}
          />
        </Swipeable>
      </YGroup.Item>
    </Animated.View>
  );
}
