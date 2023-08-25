import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import {
  ArchiveBox,
  Lock,
  Plus,
  TrashSimple,
  User,
} from "phosphor-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Separator, XStack, useTheme } from "tamagui";

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
  const theme = useTheme();
  const text = theme.color.get();
  const disabledText = theme.gray7.get();
  const navigation = useNavigation();

  const headerRight = useCallback(() => {
    return (
      <XStack gap={8}>
        {isEligible && (
          <Pressable onPress={onPressLock} accessibilityRole="button">
            <Lock color={isPrivate ? text : disabledText} />
          </Pressable>
        )}
        <Pressable onPress={onPressArchive} accessibilityRole="button">
          <ArchiveBox color={text} />
        </Pressable>
        <Pressable onPress={onPressTrash} accessibilityRole="button">
          <TrashSimple color={text} />
        </Pressable>
        <Separator vertical />
        <Pressable onPress={onPressPlus} accessibilityRole="button">
          <Plus color={text} />
        </Pressable>
        <Pressable onPress={onPressProfile} accessibilityRole="button">
          <User color={text} />
        </Pressable>
      </XStack>
    );
  }, [
    disabledText,
    isEligible,
    isPrivate,
    onPressArchive,
    onPressLock,
    onPressPlus,
    onPressProfile,
    onPressTrash,
    text,
  ]);

  useEffect(() => {
    (async () => {
      const enrolledLevel = await LocalAuthentication.getEnrolledLevelAsync();
      if (enrolledLevel > 1) {
        setIsEligible(true);
      }
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight,
      });
    }, [])
  );

  return null;
}
