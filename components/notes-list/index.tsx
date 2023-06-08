import React, { Fragment } from "react";
import { FlatList, Text, View, ViewStyle } from "react-native";
import { Plus } from "phosphor-react-native";

import { Note } from "types";
import { theme } from "themes";
import Spacing from "components/spacing";
import Divider from "components/divider";

import NoteListItemView from "./note-list-item";

interface NotesListProps {
  onPressNote: (note: Note) => void;
  notes: Note[];
}

const ItemSeparatorComponent = React.memo(() => (
  <Fragment>
    <Divider />
  </Fragment>
));

export default function NotesList({ notes, onPressNote }: NotesListProps) {
  const renderItem = ({ item }: { item: Note }) => {
    return (
      <NoteListItemView
        key={item.id}
        item={item}
        onPress={() => onPressNote(item)}
      />
    );
  };

  return (
    <View style={$root}>
      <FlatList
        ListEmptyComponent={() => {
          return (
            <View style={$emptyContainer}>
              <View style={$emptyContent}>
                <Text>No Notes?</Text>
                <Spacing />
                <Text>
                  Click the <Plus size={18} /> button to create your first note!
                </Text>
              </View>
            </View>
          );
        }}
        contentContainerStyle={$content}
        data={notes}
        scrollEnabled={!!notes.length}
        renderItem={renderItem}
        style={$container}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
}

const $root: ViewStyle = { flex: 1, backgroundColor: theme.colors.background };

const $emptyContainer: ViewStyle = {
  justifyContent: "flex-end",
  flex: 1,
};

const $emptyContent: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  paddingBottom: 40,
};

const $content: ViewStyle = {
  flexGrow: 1,
  backgroundColor: theme.colors.background,
};

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: theme.colors.background,
};
