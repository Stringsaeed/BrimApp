import React from "react";
import { FlatList, Text, View } from "react-native";
import { Plus } from "phosphor-react-native";

import { Note } from "types";
import { theme } from "themes";
import Spacing from "components/spacing";

import NoteListItemView from "./note-list-item";

interface NotesListProps {
  onPressNote: (note: Note) => void;
  notes: Note[];
}

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
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <FlatList
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                justifyContent: "flex-end",
                flex: 1,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: 40,
                }}
              >
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
        ItemSeparatorComponent={Spacing}
      />
    </View>
  );
}

const $content = {
  flexGrow: 1,
  backgroundColor: theme.colors.background,
};

const $container = { flex: 1, backgroundColor: theme.colors.background };
