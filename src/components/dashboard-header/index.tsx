import { NativeStackHeaderItem } from "@react-navigation/native-stack";
import { ScreenProps, Stack, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Platform } from "react-native";
import { Routes } from "@/routers";
import DashboardHeaderRight from "./right";

interface Props {
  onPressCreate: () => void;
  onPressProfile: () => void;
}

export default function DashboardHeader({
  onPressProfile,
  onPressCreate,
}: Props) {
  const router = useRouter();
  const headerRight = useCallback(() => {
    return (
      <DashboardHeaderRight
        onPressProfile={onPressProfile}
        onPressCreate={onPressCreate}
      />
    );
  }, [onPressCreate, onPressProfile]);

  const unstable_headerRightItems = (): NativeStackHeaderItem[] => [
    {
      type: "menu",
      label: "Other",
      icon: {
        type: "sfSymbol",
        name: "line.3.horizontal",
      },
      menu: {
        items: [
          {
            type: "action",
            icon: {
              type: "sfSymbol",
              name: "archivebox",
            },
            label: "Archive",
            onPress: () => {
              router.push(Routes.Archive);
            },
          },
          {
            type: "action",
            icon: {
              type: "sfSymbol",
              name: "trash",
            },
            label: "Trashed",
            onPress: () => {
              router.push(Routes.Trash);
            },
          },
        ],
      },
    },
    {
      type: "button",
      label: "Create",
      icon: {
        type: "sfSymbol",
        name: "plus",
      },
      onPress: onPressCreate,
    },
    {
      type: "button",
      label: "Profile",
      icon: {
        type: "sfSymbol",
        name: "gearshape",
      },
      onPress: onPressProfile,
    },
  ];

  return (
    <Stack.Screen
      options={Platform.select<ScreenProps["options"]>({
        default: {
          headerRight: headerRight,
        },
        ios: {
          unstable_headerRightItems: unstable_headerRightItems,
        },
      })}
    />
  );
}
