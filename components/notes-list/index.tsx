import React, { Fragment } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import NoteListItemView from "./note-list-item";
import { Note } from "types";
import { theme } from "themes";
import Divider from "components/divider";
import { useHeaderHeight } from "@react-navigation/elements";
import Animated, { FadeIn, FadeOutLeft, Layout } from "react-native-reanimated";

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

  return (
    <View style={$root}>
      <Animated.ScrollView
        style={$container}
        contentContainerStyle={[$content, { marginTop: headerHeight + 16 }]}
      >
        <Animated.View>
          {notes.map((note, index, data) => {
            return (
              <Animated.View
                exiting={FadeOutLeft}
                entering={FadeIn}
                layout={Layout.springify().duration(200)}
                key={note.id}
              >
                <NoteListItemView
                  key={note.id}
                  item={note}
                  onPress={() => onPressNote(note)}
                />
                {index !== data.length - 1 && <ItemSeparatorComponent />}
              </Animated.View>
            );
          })}
        </Animated.View>
      </Animated.ScrollView>
      {/* <FlatList
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
        data={notes}
        scrollEnabled={!!notes.length}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      /> */}
    </View>
  );
}

const $root: ViewStyle = { backgroundColor: theme.colors.background, flex: 1 };

// const $emptyContainer: ViewStyle = {
//   justifyContent: "flex-end",
//   flex: 1,
// };

// const $emptyContent: ViewStyle = {
//   justifyContent: "center",
//   alignItems: "center",
//   paddingBottom: 40,
// };

const $content: ViewStyle = {
  backgroundColor: theme.colors.background,
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: theme.colors.info,
  overflow: "hidden",
  borderRadius: 8,
  width: "100%",
};

const $container: ViewStyle = {
  backgroundColor: theme.colors.background,
  marginHorizontal: 16,
  flexGrow: 1,
};
