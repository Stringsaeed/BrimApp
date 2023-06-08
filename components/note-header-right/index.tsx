import { Stack } from "expo-router";
import { Lock, Plus, User } from "phosphor-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

interface NoteHeaderRightProps {
  onPressLock?: () => void;
  isPrivate?: boolean | null | undefined;
}

export default function NoteHeaderRight({
  onPressLock,
  isPrivate = false,
}: NoteHeaderRightProps) {
  const [isEligible, setIsEligible] = useState(false);

  const headerRight = useCallback(() => {
    if (!isEligible) {
      return null;
    }
    return (
      <View style={{ gap: 8, flexDirection: "row" }}>
        <Pressable onPress={onPressLock} accessibilityRole="button">
          <Lock color={isPrivate ? "#000000" : "#71787F"} />
        </Pressable>
        <Pressable accessibilityRole="button">
          <Plus color="black" />
        </Pressable>
        <Pressable accessibilityRole="button">
          <User color="black" />
        </Pressable>
      </View>
    );
  }, [isEligible, isPrivate, onPressLock]);

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
