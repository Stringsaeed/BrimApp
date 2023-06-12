import React, { Fragment } from "react";
import { FlatList, Text, View, ViewStyle } from "react-native";
import { Plus } from "phosphor-react-native";

import NoteListItemView from "./note-list-item";
import { Note } from "types";
import { theme } from "themes";
import Spacing from "components/spacing";
import Divider from "components/divider";
import { useHeaderHeight } from "@react-navigation/elements";

interface NotesListProps {
  onPressNote: (note: Note) => void;
  notes: Note[];
}

const ItemSeparatorComponent = React.memo(() => (
  <Fragment>
    <Divider />
  </Fragment>
));

export default function NotesList({ onPressNote, notes }: NotesListProps) {
  const headerHeight = useHeaderHeight();
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
        contentContainerStyle={[$content, { paddingTop: headerHeight }]}
        data={notes}
        scrollEnabled={!!notes.length}
        renderItem={renderItem}
        style={$container}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
}

const $root: ViewStyle = { backgroundColor: theme.colors.background, flex: 1 };

const $emptyContainer: ViewStyle = {
  justifyContent: "flex-end",
  flex: 1,
};

const $emptyContent: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: 40,
};

const $content: ViewStyle = {
  backgroundColor: theme.colors.background,
  flexGrow: 1,
};

const $container: ViewStyle = {
  backgroundColor: theme.colors.background,
  flex: 1,
};
