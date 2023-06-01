import React from "react";
import { Stack, useRouter } from "expo-router";
import { View } from "react-native";
import { styled } from "tamagui";

import { NotesHeaderRight, NotesList } from "components";
import { useNotesContext } from "contexts";
import { Note } from "types";

export default function NotesPage() {
  const router = useRouter();
  const { notes } = useNotesContext();

  const onPressNote = (note: Note) => {
    router.push(`/note/${note.id}`);
  };

  const onPressCreate = () => {
    router.push("/create");
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
          title: "",
          headerTintColor: "black",
          headerShown: true,
          headerRight: renderHeaderRight,
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
