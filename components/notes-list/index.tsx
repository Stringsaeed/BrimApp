import { useHeaderHeight } from "@react-navigation/elements";
import React, { Fragment, useCallback } from "react";
import { ListRenderItemInfo, ViewStyle } from "react-native";
import Animated, { FadeIn, FadeOutLeft } from "react-native-reanimated";

import Divider from "components/divider";
import { useNotesList } from "contexts";
import { theme } from "themes";
import { Note } from "types";

import ListEmptyView from "./list-empty-view";
import NoteListItemView from "./note-list-item";

interface NotesListProps {
  onPressNote: (note: Note) => void;
}

export default function NotesList({ onPressNote }: NotesListProps) {
  const headerHeight = useHeaderHeight();
  const actualTop = headerHeight + 16;
  const { unarchiveNote, archiveNote, deleteNote, notes } = useNotesList();

  const handleRemove = useCallback(
    (item: Note) => {
      deleteNote(item);
    },
    [deleteNote]
  );

  const handleToggleArchive = useCallback(
    (item: Note) => {
      if (item.is_archived) {
        unarchiveNote(item.id);
      } else {
        archiveNote(item.id);
      }
    },
    [archiveNote, unarchiveNote]
  );

  const renderItem = useCallback(
    ({ index, item }: Omit<ListRenderItemInfo<Note>, "separators">) => {
      const onRemove = () => handleRemove(item);
      const toggleArchive = () => handleToggleArchive(item);
      const onPress = () => onPressNote(item);

      return (
        <Fragment key={item.id}>
          <NoteListItemView
            key={item.id}
            item={item}
            onPress={onPress}
            onRemove={onRemove}
            toggleArchive={toggleArchive}
          />
          {index < notes.length - 1 && <Divider />}
        </Fragment>
      );
    },
    [handleToggleArchive, handleRemove, notes.length, onPressNote]
  );

  if (!notes.length) return <ListEmptyView />;

  return (
    <Animated.ScrollView
      entering={FadeIn}
      exiting={FadeOutLeft}
      style={$container}
      contentContainerStyle={[
        $contentContainerStyle,
        { paddingTop: actualTop },
      ]}
    >
      <Animated.View style={$content_content}>
        {notes.map((note, index) => renderItem({ item: note, index }))}
      </Animated.View>
    </Animated.ScrollView>
  );
}

const $container: ViewStyle = {
  backgroundColor: theme.colors.background,
  flex: 1,
};

const $contentContainerStyle: ViewStyle = {
  height: "100%",
  flexGrow: 1,
};

const $content_content: ViewStyle = { minHeight: "100%", flex: 1 };
