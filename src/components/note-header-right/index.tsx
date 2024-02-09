import { Lock, Unlock } from "@tamagui/lucide-icons";
import { Stack } from "expo-router";
import React, { Fragment, useCallback } from "react";
import { Button, Separator, XGroup } from "tamagui";

import { useIsLocalAuthenticationEligible } from "hooks";

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
  const isEligible = useIsLocalAuthenticationEligible();

  const headerRight = useCallback(() => {
    return (
      <XGroup size="$2" animation="slow" enterStyle={{ opacity: 0 }}>
        {isEligible && (
          <Fragment>
            <XGroup.Item>
              <Button
                size="$3"
                circular
                onPress={onPressLock}
                icon={isPrivate ? Lock : Unlock}
              />
            </XGroup.Item>
            <Separator vertical />
          </Fragment>
        )}
        <NotePageHeaderMenu
          onPressArchive={onPressArchive}
          onPressTrash={onPressTrash}
          onPressLock={onPressLock}
          isPrivate={isPrivate}
        />
      </XGroup>
    );
  }, [isEligible, isPrivate, onPressArchive, onPressLock, onPressTrash]);

  return <Stack.Screen options={{ headerRight }} />;
}
