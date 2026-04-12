import { NativeStackHeaderItem } from "@react-navigation/native-stack";
import { Lock, Unlock } from "@tamagui/lucide-icons";
import { Stack } from "expo-router";
import React, { useCallback } from "react";
import { Platform } from "react-native";
import { XGroup } from "tamagui";
import PressableScale from "@/components/pressable-scale";
import useIsLocalAuthenticationEligible from "@/hooks/use-is-local-authentication-eligible";
import useUserAccent from "@/hooks/use-user-accent";
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

  const unstable_headerRight = (): NativeStackHeaderItem[] => [
    {
      type: "button",
      label: "Toggle Privacy",
      icon: {
        type: "sfSymbol",
        name: !isPrivate ? "lock" : "lock.open",
      },
      sharesBackground: false,
      onPress: () => onPressLock?.(),
    },
    {
      type: "menu",
      label: "Actions",
      icon: {
        type: "sfSymbol",
        name: "ellipsis",
      },
      menu: {
        items: [
          {
            type: "action",
            label: "Archive",
            icon: {
              type: "sfSymbol",
              name: "archivebox",
            },
            onPress: () => onPressArchive?.(),
          },
          {
            type: "action",
            label: "Trash",
            icon: {
              type: "sfSymbol",
              name: "trash",
            },
            onPress: () => onPressTrash?.(),
          },
        ],
      },
    },
  ];

  return (
    <Stack.Screen
      options={Platform.select({
        default: { headerRight },
        ios: {
          unstable_headerRightItems: unstable_headerRight,
        },
      })}
    />
  );
}
