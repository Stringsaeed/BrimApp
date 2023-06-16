import React, { Fragment, useCallback } from "react";
import { ViewStyle } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import Animated, {
  FadeIn,
  FadeOutLeft,
  FadeOutUp,
  Layout,
} from "react-native-reanimated";

import { Note } from "types";
import { theme } from "themes";
import Divider from "components/divider";

import ListEmptyView from "./list-empty-view";
import NoteListItemView from "./note-list-item";
import { useLayout } from "hooks";

interface NotesListProps {
  onPressNote: (note: Note) => void;
  notes: Note[];
}

const ItemSeparatorComponent = React.memo(() => (
  <Fragment>
    <Divider />
  </Fragment>
));

export default function NotesList({ onPressNote, notes }: NotesListProps) {
  const { onLayout, height } = useLayout();
  const headerHeight = useHeaderHeight();
  const actualTop = headerHeight + 16;
  const ref = React.useRef<FlashList<Note>>(null);
  const renderItem = useCallback(
    ({ index, item }: ListRenderItemInfo<Note>) => {
      return (
        <Animated.View
          exiting={index === notes.length - 1 ? FadeOutUp : FadeOutLeft}
          entering={FadeIn}
          layout={Layout.springify().duration(50)}
        >
          <NoteListItemView
            beforeRemove={() => {
              ref.current?.prepareForLayoutAnimationRender();
            }}
            item={item}
            onPress={() => onPressNote(item)}
          />
        </Animated.View>
      );
    },
    [notes.length, onPressNote]
  );

  return (
    <Animated.View
      onLayout={onLayout}
      entering={FadeIn}
      exiting={FadeOutLeft}
      style={$container}
    >
      <FlashList
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
