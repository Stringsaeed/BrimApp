import React from "react";
import { Stack, useRouter } from "expo-router";
import { View } from "react-native";
import { styled } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

import { NotesHeaderRight, NotesList } from "components";
import { useNotesContext } from "contexts";
import { Note } from "types";

export default function NotesPage() {
  const router = useRouter();
  const { notes, addNote } = useNotesContext();

  const onPressNote = (note: Note) => {
    router.push(`/notes/${note.id}`);
  };

  const onPressCreate = async () => {
    const ref = await addNote("");
    router.push(`/notes/${ref}`);
  };

  const onPressProfile = () => {
    router.push("/profile");
  };

  const renderHeaderRight = () => {
    return (
      <NotesHeaderRight
        onPressCreate={onPressCreate}
        onPressProfile={onPressProfile}
      />
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Notes",
          headerTintColor: "black",
          headerShown: true,
          headerRight: renderHeaderRight,
          headerBackground() {
            return <LinearGradient flex={1} colors={["$purple5", "beige"]} />;
          },
        }}
      />
      <Container>
        <NotesList onPressNote={onPressNote} notes={notes} />
      </Container>
    </>
  );
}

const Container = styled(View, {
  flex: 1,
  backgroundColor: "beige",
});
