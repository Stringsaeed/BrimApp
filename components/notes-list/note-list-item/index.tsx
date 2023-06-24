import { ArchiveBox, ArrowUUpLeft, Trash } from "phosphor-react-native";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

import Spacing from "components/spacing";
import { Body, Caption1 } from "components/typography";
import { theme } from "themes";
import { Note } from "types";
import { cipherTitle, getNoteTitle } from "utils";

export interface NoteListItemProps {
  item: Note;
  onPress: () => void;
  onRemove?: () => void;
  toggleArchive?: () => void;
}

export default function NoteListItemView({
  toggleArchive,
  onRemove,
  onPress,
  item,
}: NoteListItemProps) {
  const content = useMemo(() => {
    const title = getNoteTitle(item.note);
    if (!item.is_private) return title;

    return cipherTitle(title);
  }, [item.is_private, item.note]);

  const renderRightActions = useCallback(() => {
    if (!onRemove) return null;
    return (
      <Animated.View style={styles.rightAction}>
        <RectButton style={styles.rightActionButton} onPress={onRemove}>
          <Trash color="white" />
        </RectButton>
      </Animated.View>
    );
  }, [onRemove]);

  const renderLeftActions = useCallback(() => {
    if (!toggleArchive) return null;

    return (
      <Animated.View style={styles.leftAction}>
        <RectButton style={styles.leftActionButton} onPress={toggleArchive}>
          {item.is_archived ? (
            <ArrowUUpLeft color="white" />
          ) : (
            <ArchiveBox color="white" />
          )}
        </RectButton>
      </Animated.View>
    );
  }, [item.is_archived, toggleArchive]);

  const onSwipeableWillOpen = (direction: "left" | "right") => {
    if (direction === "left") {
      toggleArchive?.();
    } else if (direction === "right") {
      onRemove?.();
    }
  };

  return (
    <Animated.View
      exiting={FadeOut}
      entering={FadeIn}
      layout={Layout.springify().duration(1000)}
    >
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
          {/* <ArrowRight color="black" /> */}
        </RectButton>
      </Swipeable>
    </Animated.View>
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
