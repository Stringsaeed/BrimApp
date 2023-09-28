import { MoreHorizontal } from "@tamagui/lucide-icons";
import React from "react";

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
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <LockNoteDropDownItem onPressLock={onPressLock} isPrivate={isPrivate} />
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
