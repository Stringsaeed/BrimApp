import { Stack, useRouter } from "expo-router";
import { CheckIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

import { useNotesContext } from "contexts";

export default function NotesCreate() {
  const [note, setNote] = useState("");
  const router = useRouter();
  const { addNote } = useNotesContext();

  const renderHeaderRight = () => {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          addNote(note);
          router.back();
        }}
      >
        <CheckIcon />
      </Pressable>
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
      <TextInput
        accessibilityLabel="Text input field"
        style={styles.input}
        scrollEnabled
        multiline
        value={note}
        onChangeText={setNote}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    fontSize: 16,
    fontWeight: "400",
  },
});
