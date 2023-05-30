import React, { useCallback } from "react";
import { Note, useNotesContext } from "contexts";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";

import Spacing from "../spacing";

import NoteListItemView from "./note-list-item";

export default function NotesList() {
  const { notes } = useNotesContext();

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Note>) => {
    return <NoteListItemView item={item} />;
  }, []);

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
