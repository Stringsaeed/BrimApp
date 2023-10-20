import { Archive, X, Trash2 } from "@tamagui/lucide-icons";
import React from "react";
import { Alert } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, SizableText, Spacer, View, XGroup, XStack } from "tamagui";

import { useNotesList } from "contexts";

export default function NoteListMultiselectMenu() {
  const { bottom } = useSafeAreaInsets();
  const { toggleMultiSelectMode, multiSelectMode, selectedNotes } =
    useNotesList();

  // TODO: Implement this
  const notImplementedFn = () => {
    Alert.alert("Not implemented");
  };

  if (!multiSelectMode) {
    return <></>;
  }

  return (
    <Animated.View exiting={FadeOut} entering={FadeIn}>
      <XStack
        pb={bottom + 8}
        pt="$2"
        px="$4"
        borderTopWidth={1}
        borderColor="$gray4"
        alignItems="center"
        justifyContent="space-between"
      >
        <SizableText>{selectedNotes.length} Selected</SizableText>
        <Spacer />
        <XGroup>
          <XGroup.Item>
            <Button onPress={notImplementedFn} icon={Archive} circular />
          </XGroup.Item>
          <XGroup.Item>
            <Button onPress={notImplementedFn} icon={Trash2} circular />
          </XGroup.Item>
          <View height="100%" bg="$color" borderLeftWidth={1} />
          <XGroup.Item>
            <Button icon={X} circular onPress={toggleMultiSelectMode} />
          </XGroup.Item>
        </XGroup>
      </XStack>
    </Animated.View>
  );
}
