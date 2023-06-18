import { ArchiveBox, ArrowRight, Trash } from "phosphor-react-native";
import React, { useCallback, useMemo } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";

import Spacing from "components/spacing";
import { Body, Caption1 } from "components/typography";
import { useNotesContext } from "contexts";
import { theme } from "themes";
import { Note } from "types";
import { cipherTitle, getNoteTitle } from "utils";

export interface NoteListItemProps {
  item: Note;
  onPress: () => void;
  beforeRemove?: () => void;
}

export default function NoteListItemView({
  beforeRemove,
  onPress,
  item,
}: NoteListItemProps) {
  const { archiveNote, removeNote } = useNotesContext();
  const handleRemove = useCallback(() => {
    beforeRemove?.();
    removeNote(item.id);
  }, [beforeRemove, item.id, removeNote]);

  const content = useMemo(() => {
    const title = getNoteTitle(item.note);
    if (!item.is_private) return title;

    return cipherTitle(title);
  }, [item.is_private, item.note]);

  const renderRightActions = useCallback(
    () => (
      <Animated.View style={styles.rightAction}>
        <RectButton style={styles.rightActionButton} onPress={handleRemove}>
          <Trash color="white" />
        </RectButton>
      </Animated.View>
    ),
    [handleRemove]
  );

  const renderLeftActions = useCallback(
    () => (
      <Animated.View style={styles.leftAction}>
        <RectButton style={styles.leftActionButton} onPress={handleRemove}>
          <ArchiveBox color="white" />
        </RectButton>
      </Animated.View>
    ),
    [handleRemove]
  );

  const onSwipeableWillOpen = (direction: "left" | "right") => {
    if (direction === "left") {
      archiveNote?.(item.id);
    } else {
      handleRemove();
    }
  };

  return (
    <Swipeable
      onSwipeableWillOpen={onSwipeableWillOpen}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
    >
      <RectButton style={styles.container} onPress={onPress}>
        <View style={styles.content}>
          <Body color={item.title ? "text" : "disabled"} numberOfLines={1}>
            {item.title || "Draft"}
          </Body>
          <Spacing size={0.5} />
          <Caption1 numberOfLines={1}>{content}</Caption1>
        </View>
        <ArrowRight color="black" />
      </RectButton>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    paddingVertical: 8,
    borderRadius: 8,
  },
  leftActionButton: {
    backgroundColor: theme.colors.warning,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  rightActionButton: {
    backgroundColor: theme.colors.danger,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  leftAction: {
    backgroundColor: theme.colors.warning,
    overflow: "hidden",
    borderRadius: 8,
    flex: 1,
  },
  rightAction: {
    backgroundColor: theme.colors.danger,
    overflow: "hidden",
    borderRadius: 8,
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
