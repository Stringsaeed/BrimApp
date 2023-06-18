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
} from "themes";

export default function OtherMenu() {
  const router = useRouter();

  const onPressArchive = () => {
    router.push("/notes/archive");
  };

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <List color="black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={onPressArchive} key="archive">
          <DropdownMenuItemIcon
            ios={{
              // alternative to hierarchical color. Requires iOS 15+
              paletteColors: [
                {
                  dynamic: {
                    light: "green",
                    dark: "blue",
                  },
                },
              ],
              // can also be a color string. Requires iOS 15+
              hierarchicalColor: {
                dynamic: {
                  light: "green",
                  dark: "blue",
                },
              },
              name: "archivebox",
              weight: "semibold",
              scale: "medium",
              pointSize: 5,
            }}
            androidIconName="archive_box"
          />

          <DropdownMenuItemTitle>Archive</DropdownMenuItemTitle>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
