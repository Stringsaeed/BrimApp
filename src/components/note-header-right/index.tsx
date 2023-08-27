import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";

import NotePageHeaderMenu from "./menu";

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
  onPressArchive,
  onPressTrash,
  onPressLock,
}: NoteHeaderRightProps) {
  const navigation = useNavigation();

  const headerRight = useCallback(() => {
    return (
      <NotePageHeaderMenu
        onPressArchive={onPressArchive}
        onPressTrash={onPressTrash}
        onPressLock={onPressLock}
        isPrivate={isPrivate}
      />
    );
  }, [isPrivate, onPressArchive, onPressLock, onPressTrash]);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight,
      });
    }, [headerRight, navigation])
  );

  return null;
}
