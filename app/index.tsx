import React from "react";
import { Stack, useRouter } from "expo-router";
import { View } from "react-native";
import { styled } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import { hideAsync } from "expo-splash-screen";

import { NotesHeaderRight, NotesList } from "components";
import { useNotesContext } from "contexts";
import { Note } from "types";

export default function NotesPage() {
  const router = useRouter();
  const { notes, addNote } = useNotesContext();

  const onPressNote = (note: Note) => {
    router.push({
      pathname: `/notes/${note.id}`,
      params: { note: JSON.stringify(note) },
    });
  };

  const onPressCreate = async () => {
    const note = await addNote("", true);

    router.push({
      pathname: `/notes/${note.id}`,
      params: { note: JSON.stringify(note) },
    });
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
      <Container onLayout={hideAsync}>
        <NotesList onPressNote={onPressNote} notes={notes} />
      </Container>
    </>
  );
}

const Container = styled(View, {
  flex: 1,
  backgroundColor: "beige",
});
