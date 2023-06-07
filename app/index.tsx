import React from "react";
import { Stack, useRouter } from "expo-router";
import { View } from "react-native";
import { hideAsync } from "expo-splash-screen";
import * as LocalAuthentication from "expo-local-authentication";
import { useHeaderHeight } from "@react-navigation/elements";

import { NotesHeaderRight, NotesList } from "components";
import { useNotesContext } from "contexts";
import { Note } from "types";
import { theme } from "themes";

export default function NotesPage() {
  const router = useRouter();
  const { notes, addNote } = useNotesContext();
  const headerHeight = useHeaderHeight();

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
          headerShown: true,
          headerRight: renderHeaderRight,
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          paddingTop: headerHeight,
        }}
        onLayout={hideAsync}
      >
        <NotesList onPressNote={onPressNote} notes={notes} />
      </View>
    </>
  );
}
