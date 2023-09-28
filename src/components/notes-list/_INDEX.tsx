import React, { useCallback } from "react";
import { ListRenderItemInfo } from "react-native";
import Animated from "react-native-reanimated";
import { Separator, YGroup } from "tamagui";

import { useNotesList } from "contexts";
import { Note } from "types";

import NoteListItemView from "./note-list-item";

interface NotesListProps {
  onPressNote: (note: Note) => void;
  pullToActionEnabled?: boolean;
}

export default function NoteList({ onPressNote }: NotesListProps) {
  const { restoreNote, archiveNote, deleteNote, notes } = useNotesList();

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
    <Animated.ScrollView contentInsetAdjustmentBehavior="automatic">
      {notes.length ? (
        <YGroup ov="hidden" separator={<Separator />} mx="$4" bordered>
          {notes.map((note, index) => renderItem({ item: note, index }))}
        </YGroup>
      ) : (
        <></>
      )}
    </Animated.ScrollView>
  );
}
