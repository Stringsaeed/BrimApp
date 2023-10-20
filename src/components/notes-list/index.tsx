import React, { useCallback } from "react";
import { ListRenderItemInfo } from "react-native";
import Animated, { Layout } from "react-native-reanimated";

import { useNotesList } from "contexts";
import { Note } from "types";

import ListEmptyView from "./list-empty-view";
import NoteListItemView from "./note-list-item";
import NoteListMultiselectMenu from "./note-list-multiselect-menu";
import NoteListSearchBar from "./note-list-search-bar";
import styles from "./styles";

interface NotesListProps {
  onPressNote: (note: Note) => void;
}

export default function NoteList({ onPressNote }: NotesListProps) {
  const { archiveNote, restoreNote, deleteNote, notes } = useNotesList();

  const handleRemove = useCallback(
    (item: Note) => {
      deleteNote(item);
    },
    [deleteNote]
  );

  const handleLeftAction = useCallback(
    (item: Note) => {
      const toRestore =
        item.is_archived ||
        item.is_trashed ||
        ["trashed", "archived"].includes(item.status);

      if (toRestore) {
        restoreNote(item.id);
      } else {
        archiveNote(item.id);
      }
    },
    [archiveNote, restoreNote]
  );

  const renderItem = useCallback(
    ({ item }: Omit<ListRenderItemInfo<Note>, "separators">) => {
      const onRemove = () => handleRemove(item);
      const onLeftAction = () => handleLeftAction(item);
      const onPress = () => onPressNote(item);

      return (
        <NoteListItemView
          key={item.id}
          item={item}
          onPress={onPress}
          onRemove={onRemove}
          onLeftAction={onLeftAction}
        />
      );
    },
    [handleLeftAction, handleRemove, onPressNote]
  );

  return (
    <Animated.View layout={Layout.springify()} style={styles.list}>
      <Animated.FlatList
        data={notes}
        ListHeaderComponent={NoteListSearchBar}
        renderItem={renderItem}
        style={styles.list}
        contentContainerStyle={styles.content}
        ListEmptyComponent={ListEmptyView}
      />
      <NoteListMultiselectMenu />
    </Animated.View>
  );
}
