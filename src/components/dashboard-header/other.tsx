import { AlignJustify } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

import PressableScale from "@/components/pressable-scale";
import { Routes } from "@/routers";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@/themes";

export default function OtherMenu() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const onPressArchive = () => {
    router.push(Routes.Archive);
  };

  const onPressTrash = () => {
    router.push(Routes.Trash);
  };

  return (
    <DropdownMenuRoot key={colorScheme}>
      <DropdownMenuTrigger>
        <PressableScale activeScale={0.9}>
          <AlignJustify />
        </PressableScale>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        loop
        side="right"
        align="end"
        alignOffset={undefined}
        avoidCollisions={undefined}
        collisionPadding={undefined}
        sideOffset={undefined}
      >
        <DropdownMenuItem onSelect={onPressArchive} key="archive">
          <DropdownMenuItemIcon
            ios={{
              weight: "semibold",
              name: "archivebox",
              scale: "medium",
            }}
            androidIconName="archive_box"
          />

          <DropdownMenuItemTitle>Archive</DropdownMenuItemTitle>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onPressTrash} key="trashed">
          <DropdownMenuItemIcon
            ios={{
              weight: "semibold",
              scale: "medium",
              name: "trash",
            }}
            androidIconName="trashed"
          />

          <DropdownMenuItemTitle>Trash</DropdownMenuItemTitle>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
