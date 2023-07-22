import * as LocalAuthentication from "expo-local-authentication";
import { Stack } from "expo-router";
import {
  ArchiveBox,
  Lock,
  Plus,
  TrashSimple,
  User,
} from "phosphor-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, View, ViewStyle } from "react-native";

import { theme } from "themes";

interface NoteHeaderRightProps {
  onPressLock?: () => void;
  isPrivate?: boolean | null | undefined;
  onPressTrash?: () => void;
  onPressPlus?: () => void;
  onPressArchive?: () => void;
  onPressProfile?: () => void;
}

export default function NoteHeaderRight({
  isPrivate = false,
  onPressProfile,
  onPressArchive,
  onPressTrash,
  onPressPlus,
  onPressLock,
}: NoteHeaderRightProps) {
  const [isEligible, setIsEligible] = useState(false);

  const headerRight = useCallback(() => {
    return (
      <View style={containerStyle}>
        {isEligible && (
          <Pressable onPress={onPressLock} accessibilityRole="button">
            <Lock
              color={isPrivate ? theme.colors.text : theme.colors.disabledText}
            />
          </Pressable>
        )}
        <Pressable onPress={onPressArchive} accessibilityRole="button">
          <ArchiveBox color={theme.colors.text} />
        </Pressable>
        <Pressable onPress={onPressTrash} accessibilityRole="button">
          <TrashSimple color={theme.colors.text} />
        </Pressable>
        <View style={dividerStyle} />
        <Pressable onPress={onPressPlus} accessibilityRole="button">
          <Plus color={theme.colors.text} />
        </Pressable>
        <Pressable onPress={onPressProfile} accessibilityRole="button">
          <User color={theme.colors.text} />
        </Pressable>
      </View>
    );
  }, [
    isEligible,
    isPrivate,
    onPressArchive,
    onPressLock,
    onPressPlus,
    onPressProfile,
    onPressTrash,
  ]);

  useEffect(() => {
    (async () => {
      const enrolledLevel = await LocalAuthentication.getEnrolledLevelAsync();
      if (enrolledLevel > 1) {
        setIsEligible(true);
      }
    })();
  }, []);

  return <Stack.Screen options={{ headerRight }} />;
}

const dividerStyle = { backgroundColor: "#71787F", height: 16, width: 1 };
const containerStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
};
