import React from "react";
import { Stack as RouterStack } from "expo-router";
import { Stack } from "tamagui";
import { Check } from "phosphor-react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import { Pressable } from "react-native";
import database from "@react-native-firebase/database";

import { useNoteQuery } from "hooks";
import { Composer } from "components";

export default function NotePage() {
  const { data, userId, noteId } = useNoteQuery();

  const richTextRef = React.useRef<RichEditor>(null);

  const [updatedNote, setNote] = React.useState<string>();

  const renderHeaderRight = () => {
    return (
      <Pressable
        onPress={() => {
          database()
            .ref(`/notes/${userId}/${noteId}`)
            .update({
              note: updatedNote ?? "",
              is_draft: false,
            });
        }}
        accessibilityRole="button"
      >
        <Check color="black" />
      </Pressable>
    );
  };

  return (
    <>
      <RouterStack.Screen
        options={{
          headerRight: renderHeaderRight,
        }}
      />
      <Stack flex={1} bg="beige">
        <Composer
          ref={richTextRef}
          onUserInput={setNote}
          onLoadEnd={() => {
            if (data?.note) richTextRef.current?.insertHTML(data?.note);
            if (data?.note) setNote?.(data?.note);
            richTextRef.current?.focusContentEditor();
          }}
        />
      </Stack>
    </>
  );
}
