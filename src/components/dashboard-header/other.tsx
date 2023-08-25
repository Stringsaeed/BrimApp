import { useNavigation } from "@react-navigation/native";
import { List } from "phosphor-react-native";
import React from "react";
import { useTheme } from "tamagui";

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

  const theme = useTheme();
  const text = theme.color.get();

  const onPressArchive = () => {
    navigation.navigate("Archive");
  };

  const onPressTrash = () => {
    navigation.navigate("Trash");
  };

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <List color={text} />
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
