import React, { useCallback } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";

import { Note } from "types";

import Spacing from "../spacing";

import NoteListItemView from "./note-list-item";

interface NotesListProps {
  onPressNote: (note: Note) => void;
  notes: Note[];
}

export default function NotesList({ notes, onPressNote }: NotesListProps) {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Note>) => (
      <NoteListItemView item={item} onPress={() => onPressNote(item)} />
    ),
    [onPressNote]
  );

  const renderSeparator = useCallback(() => <Spacing size={4} />, []);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={renderSeparator}
      data={notes}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingBottom: 48,
  },
});
