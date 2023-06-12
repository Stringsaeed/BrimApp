import * as LocalAuthentication from "expo-local-authentication";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { useNotesContext } from "contexts";
import { Note } from "types";
import { NotesHeaderRight, NotesList, ScreenContainer } from "components";

export default function NotesPage() {
  const router = useRouter();
  const { addNote, notes } = useNotesContext();

  const onPressNote = async (note: Note) => {
    if (note.is_private) {
      const { success } = await LocalAuthentication.authenticateAsync({
        disableDeviceFallback: false,
      });
      if (!success) {
        return;
      }
    }

    router.push({
      params: { note: JSON.stringify(note) },
      pathname: `/notes/${note.id}`,
    });
  };

  const onPressCreate = async () => {
    const note = await addNote("", true);

    router.push({
      params: { note: JSON.stringify(note) },
      pathname: `/notes/${note.id}`,
    });
  };

  const onPressProfile = () => {
    router.push("/profile");
  };

  const renderHeaderRight = () => {
    return (
      <NotesHeaderRight
        onPressProfile={onPressProfile}
        onPressCreate={onPressCreate}
      />
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: renderHeaderRight,
          headerBlurEffect: "light",
          headerTransparent: true,
          headerShown: true,
          title: "Notes",
        }}
      />
      <ScreenContainer withoutBeautifulPadding type="fixed">
        <NotesList onPressNote={onPressNote} notes={notes} />
      </ScreenContainer>
    </>
  );
}
