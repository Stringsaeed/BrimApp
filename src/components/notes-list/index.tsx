import React, { useCallback } from "react";
import { ListRenderItemInfo, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { Separator, YGroup } from "tamagui";

import PullToAction from "components/pull-to-action";
import { useNotesList } from "contexts";
import { Note } from "types";

import NoteListItemView from "./note-list-item";

interface NotesListProps {
  onPressNote: (note: Note) => void;
}

export default function NotesList({ onPressNote }: NotesListProps) {
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
    ({ item }: Omit<ListRenderItemInfo<Note>, "separators">) => {
      const onRemove = () => handleRemove(item);
      const toggleArchive = () => handleToggleArchive(item);
      const onPress = () => onPressNote(item);

      return (
        <NoteListItemView
          key={item.id}
          item={item}
          onPress={onPress}
          onRemove={onRemove}
          toggleArchive={toggleArchive}
        />
      );
    },
    [handleToggleArchive, handleRemove, onPressNote]
  );

  // if (!notes.length) return <ListEmptyView />;

  return (
    <PullToAction>
      <Animated.View style={$content_content}>
        <YGroup
          bordered
          separator={<Separator />}
          marginHorizontal="$4"
          overflow="hidden"
        >
          {notes.map((note, index) => renderItem({ item: note, index }))}
        </YGroup>
      </Animated.View>
    </PullToAction>
  );
}

const $content_content: ViewStyle = { minHeight: "100%", flex: 1 };
