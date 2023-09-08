import { DotsThree } from "phosphor-react-native";
import React from "react";
import { Button, useTheme } from "tamagui";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "themes";

import LockNoteDropDownItem from "./lock-note-drop-down-item";

interface NotePageHeaderMenuProps {
  onPressArchive?: () => void;
  onPressTrash?: () => void;
  isPrivate?: boolean | null | undefined;
  onPressLock?: () => void;
}
export default function NotePageHeaderMenu({
  onPressArchive,
  onPressTrash,
  onPressLock,
  isPrivate,
}: NotePageHeaderMenuProps) {
  const theme = useTheme();
  const text = theme.color.get();

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <Button
          size="$3"
          bg="$backgroundTransparent"
          scaleIcon={2}
          icon={({ size }) => (
            <DotsThree weight="bold" color={text} size={size} />
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <LockNoteDropDownItem onPressLock={onPressLock} isPrivate={isPrivate} />
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
        <DropdownMenuItem onSelect={onPressTrash} key="trash">
          <DropdownMenuItemIcon
            ios={{
              weight: "semibold",
              scale: "medium",
              name: "trash",
              pointSize: 5,
            }}
            androidIconName="trash_simple"
          />
          <DropdownMenuItemTitle>Trash</DropdownMenuItemTitle>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}