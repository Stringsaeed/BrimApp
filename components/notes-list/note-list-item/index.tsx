import React, { useCallback, useMemo } from "react";
import { ArrowRight, Trash } from "phosphor-react-native";
import { Animated, StyleSheet, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { Note } from "types";
import { cipherTitle, getNoteTitle } from "utils";
import { Body, Caption1 } from "components/typography";
import Spacing from "components/spacing";
import { theme } from "themes";
import { useNotesContext } from "contexts";

export interface NoteListItemProps {
  item: Note;
  onPress: () => void;
}

export default function NoteListItemView({ onPress, item }: NoteListItemProps) {
  const { removeNote } = useNotesContext();
  const handleRemove = useCallback(() => {
    removeNote(item.id);
  }, [item.id, removeNote]);

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

  return (
    <Swipeable
      onSwipeableOpen={handleRemove}
      renderRightActions={renderRightActions}
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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  rightActionButton: {
    backgroundColor: theme.colors.danger,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  rightAction: {
    backgroundColor: theme.colors.danger,
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
