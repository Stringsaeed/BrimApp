import { Lock, Unlock } from "@tamagui/lucide-icons";
import { Stack } from "expo-router";
import React, { useCallback } from "react";
import { XGroup } from "tamagui";

import PressableScale from "components/pressable-scale";
import { useIsLocalAuthenticationEligible, useUserAccent } from "hooks";

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
  const { accent } = useUserAccent();
  const isEligible = useIsLocalAuthenticationEligible();

  const headerRight = useCallback(() => {
    return (
      <XGroup gap="$2" animation="slow" enterStyle={{ opacity: 0 }}>
        {isEligible && (
          <XGroup.Item>
            <PressableScale onPress={onPressLock}>
              {isPrivate ? <Lock color={`$${accent}`} /> : <Unlock />}
            </PressableScale>
          </XGroup.Item>
        )}
        <NotePageHeaderMenu
          onPressArchive={onPressArchive}
          onPressTrash={onPressTrash}
          onPressLock={onPressLock}
          isPrivate={isPrivate}
        />
      </XGroup>
    );
  }, [
    accent,
    isEligible,
    isPrivate,
    onPressArchive,
    onPressLock,
    onPressTrash,
  ]);

  return <Stack.Screen options={{ headerRight }} />;
}
