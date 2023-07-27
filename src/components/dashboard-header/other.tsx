import { useRouter } from "expo-router";
import { List } from "phosphor-react-native";
import React from "react";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  theme,
} from "themes";

export default function OtherMenu() {
  const router = useRouter();

  const onPressArchive = () => {
    router.push("/notes/archive");
  };

  const onPressTrash = () => {
    router.push("/notes/trash");
  };

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <List color={theme.colors.text} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={onPressArchive} key="archive">
          <DropdownMenuItemIcon
            ios={{
              name: "archivebox",
              weight: "semibold",
              scale: "medium",
              pointSize: 5,
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
              pointSize: 5,
            }}
            androidIconName="trashed"
          />

          <DropdownMenuItemTitle>Trash</DropdownMenuItemTitle>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
