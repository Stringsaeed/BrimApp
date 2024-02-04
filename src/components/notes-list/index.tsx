import React, { useCallback } from "react";
import { SectionList, SectionListRenderItemInfo } from "react-native";
import Animated, { CurvedTransition } from "react-native-reanimated";
import { SizableText } from "tamagui";

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

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList<Note>);

export default function NoteList({ onPressNote }: NotesListProps) {
  const { archiveNote, restoreNote, deleteNote, sections } = useNotesList();

  const handleRemove = useCallback(
    (item: Note) => {
      deleteNote(item);
    },
    [deleteNote]
  );

  const handleLeftAction = useCallback(
    (item: Note) => {
      const toRestore = ["trashed", "archived"].includes(item.status);

      if (toRestore) {
        restoreNote(item.id);
      } else {
        archiveNote(item.id);
      }
    },
    [archiveNote, restoreNote]
  );

  const renderItem = useCallback(
    ({ item }: Omit<SectionListRenderItemInfo<Note>, "separators">) => {
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
    <Animated.View layout={CurvedTransition} style={styles.list}>
      <AnimatedSectionList
        sections={sections}
        ListHeaderComponent={NoteListSearchBar}
        renderItem={renderItem}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        style={styles.list}
        layout={CurvedTransition}
        contentContainerStyle={styles.content}
        ListEmptyComponent={ListEmptyView}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <SizableText textAlign="center" theme="alt1" size="$3">
            {title}
          </SizableText>
        )}
      />
      <NoteListMultiselectMenu />
    </Animated.View>
  );
}
