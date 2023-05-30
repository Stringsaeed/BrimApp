import { useNotesContext } from "contexts";
import { Stack, useRouter } from "expo-router";
import { CheckIcon } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

export default function NotesCreate() {
  const [note, setNote] = useState("");
  const router = useRouter();
  const { addNote } = useNotesContext();

  const renderHeaderRight = () => {
    return (
      <Pressable
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
          // title: "test",
          headerTintColor: "black",
          headerShown: true,
          headerRight: renderHeaderRight,
        }}
      />
      <TextInput
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          padding: 16,
          paddingVertical: 16,
          paddingHorizontal: 16,
          paddingTop: 16,
          fontSize: 16,
          fontWeight: "400",
        }}
        scrollEnabled
        multiline
        value={note}
        onChangeText={setNote}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
