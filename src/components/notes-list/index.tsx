import { Search } from "@tamagui/lucide-icons";
import React, { Fragment, useCallback } from "react";
import {
  ListRenderItemInfo,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Input, Separator, Stack, XStack, YGroup } from "tamagui";

import { useNotesList } from "contexts";
import { Note } from "types";

import ListEmptyView from "./list-empty-view";
import NoteListItemView from "./note-list-item";

interface NotesListProps {
  onPressNote: (note: Note) => void;
  pullToActionEnabled?: boolean;
  onSearchValueChange?: (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => void;
  searchValue?: string;
}

export default function NoteList({
  onSearchValueChange,
  onPressNote,
  searchValue,
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
    <Fragment>
      {onSearchValueChange && (
        <XStack
          px="$4"
          borderRadius="$12"
          mx="$4"
          mb="$4"
          backgroundColor="$gray3"
          ai="center"
        >
          <Search size="$size.1" />
          <Input
            flex={1}
            borderWidth={0}
            backgroundColor="$gray3"
            onChange={onSearchValueChange}
            value={searchValue}
            placeholder="Search notes"
            size="$3"
          />
        </XStack>
      )}
      <Animated.ScrollView contentInsetAdjustmentBehavior="automatic">
        {notes.length ? (
          <YGroup ov="hidden" separator={<Separator />} mx="$4" bordered>
            {notes.map((note, index) => renderItem({ item: note, index }))}
          </YGroup>
        ) : (
          <Stack flex={1} marginBottom={-bottom}>
            <ListEmptyView />
          </Stack>
        )}
      </Animated.ScrollView>
    </Fragment>
  );
}
