import React, { useCallback } from "react";
import { ListRenderItemInfo, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Separator, Stack, YGroup } from "tamagui";

import PullToAction from "components/pull-to-action";
import { useNotesList } from "contexts";
import { Note } from "types";

import ListEmptyView from "./list-empty-view";
import NoteListItemView from "./note-list-item";

interface NotesListProps {
  onPressNote: (note: Note) => void;
  pullToActionEnabled?: boolean;
}

export default function NotesList({
  pullToActionEnabled,
  onPressNote,
}: NotesListProps) {
  const { bottom } = useSafeAreaInsets();
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
    <PullToAction enabled={pullToActionEnabled}>
      {notes.length ? (
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
      ) : (
        <Stack flex={1} marginBottom={-bottom}>
          <ListEmptyView />
        </Stack>
      )}
    </PullToAction>
  );
}

const $content_content: ViewStyle = { minHeight: "100%", flex: 1 };
