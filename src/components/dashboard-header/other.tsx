import { useNavigation } from "@react-navigation/native";
import { List } from "phosphor-react-native";
import React from "react";
import { Button } from "tamagui";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "themes";

interface OtherMenuProps {
  color?: string;
}

export default function OtherMenu({ color }: OtherMenuProps) {
  const navigation = useNavigation();

  const onPressArchive = () => {
    navigation.navigate("Archive");
  };

  const onPressTrash = () => {
    navigation.navigate("Trash");
  };

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <Button
          animation="quick"
          // eslint-disable-next-line react-native/no-inline-styles
          enterStyle={{ opacity: 0, scale: 0.2 }}
          size="$3.5"
          borderRadius="$12"
          aspectRatio={1}
          borderWidth={0}
          bg="$backgroundTransparent"
          scaleIcon={1.4}
          icon={({ size }) => <List color={color} size={size} weight="bold" />}
        />
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
