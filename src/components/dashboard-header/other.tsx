import { useNavigation } from "@react-navigation/native";
import { AlignJustify } from "@tamagui/lucide-icons";
import React from "react";

import { Routes } from "routers";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "themes";

export default function OtherMenu() {
  const navigation = useNavigation();

  const onPressArchive = () => {
    navigation.navigate(Routes.Archive);
  };

  const onPressTrash = () => {
    navigation.navigate(Routes.Trash);
  };

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <AlignJustify />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
