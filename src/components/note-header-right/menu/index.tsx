import { MoreHorizontal } from "@tamagui/lucide-icons";
import React from "react";
import { XGroup } from "tamagui";

// import { useIsLocalAuthenticationEligible } from "hooks";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuItemTitle,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "themes";

interface NotePageHeaderMenuProps {
  onPressArchive?: () => void;
  onPressTrash?: () => void;
  isPrivate?: boolean | null | undefined;
  onPressLock?: () => void;
}
export default function NotePageHeaderMenu({
  onPressArchive,
  onPressTrash,
}: NotePageHeaderMenuProps) {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <XGroup.Item>
          <MoreHorizontal />
        </XGroup.Item>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={onPressArchive} key="archive">
          <DropdownMenuItemIcon
            ios={{
              name: "archivebox",
              weight: "semibold",
              scale: "medium",
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
            }}
            androidIconName="trash_simple"
          />
          <DropdownMenuItemTitle>Trash</DropdownMenuItemTitle>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
