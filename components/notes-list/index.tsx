import { useHeaderHeight } from "@react-navigation/elements";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import React, { Fragment, useCallback } from "react";
import { ViewStyle } from "react-native";
import Animated, { FadeIn, FadeOutLeft } from "react-native-reanimated";

import Divider from "components/divider";
import { useNotesContext } from "contexts/notes";
import { useLayout } from "hooks";
import { theme } from "themes";
import { Note } from "types";

import ListEmptyView from "./list-empty-view";
import NoteListItemView from "./note-list-item";

interface NotesListProps {
  onPressNote: (note: Note) => void;
  notes: Note[];
}

const ItemSeparatorComponent = React.memo(() => (
  <Fragment>
    <Divider />
  </Fragment>
));

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList<Note>);

export default function NotesList({ onPressNote, notes }: NotesListProps) {
  const { onLayout, height } = useLayout();
  const headerHeight = useHeaderHeight();
  const actualTop = headerHeight + 16;
  const ref = React.useRef<FlashList<Note>>(null);
  const { archiveNote, removeNote } = useNotesContext();

  const handleRemove = useCallback(
    (item: Note) => {
      removeNote(item.id, ref);
    },
    [removeNote]
  );

  const handleArchive = useCallback(
    (item: Note) => {
      archiveNote(item.id, ref);
    },
    [archiveNote]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Note>) => {
      const onRemove = () => handleRemove(item);
      const onArchive = () => handleArchive(item);
      const onPress = () => onPressNote(item);

      return (
        <NoteListItemView
          item={item}
          onPress={onPress}
          onRemove={onRemove}
          onArchive={onArchive}
        />
      );
    },
    [handleArchive, handleRemove, onPressNote]
  );

  return (
    <Animated.View
      onLayout={onLayout}
      entering={FadeIn}
      exiting={FadeOutLeft}
      style={$container}
    >
      <AnimatedFlashList
        ref={ref}
        data={notes}
        estimatedItemSize={57}
        renderItem={renderItem}
        scrollIndicatorInsets={{ top: actualTop }}
        automaticallyAdjustsScrollIndicatorInsets={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={() => <ListEmptyView height={height - actualTop} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: actualTop }}
      />
    </Animated.View>
  );
}

const $container: ViewStyle = {
  backgroundColor: theme.colors.background,
  flex: 1,
};
