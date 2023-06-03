import React from "react";
import { FlatList } from "react-native";
import { Heading, Paragraph, Separator, Spacer, Stack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import { Plus } from "phosphor-react-native";

import { Note } from "types";

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
    <Stack flex={1} bg="beige">
      <FlatList
        ListEmptyComponent={() => {
          return (
            <Stack justifyContent="flex-end" flex={1}>
              <LinearGradient
                pos="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                flex={1}
                colors={["beige", "$purple10"]}
              />

              <Stack
                alignItems="center"
                justifyContent="center"
                paddingBottom="$9"
                borderRadius="$9"
              >
                <Heading>No Notes?</Heading>
                <Spacer />
                <Paragraph>
                  Click the <Plus size={18} /> button to create your first note!
                </Paragraph>
              </Stack>
            </Stack>
          );
        }}
        contentContainerStyle={$content}
        data={notes}
        scrollEnabled={!!notes.length}
        renderItem={renderItem}
        style={$container}
        ItemSeparatorComponent={Separator}
      />
    </Stack>
  );
}

const $content = {
  flexGrow: 1,
};

const $container = { flex: 1, backgroundColor: "beige" };
