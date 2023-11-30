import React from "react";
import { SizableText } from "tamagui";

import { useIsLocalAuthenticationEligible } from "hooks";
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
  onPressLock,
  isPrivate,
}: NotePageHeaderMenuProps) {
  const isEligible = useIsLocalAuthenticationEligible();
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <SizableText color="$accent">Move</SizableText>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isEligible && (
          <DropdownMenuItem onSelect={onPressLock} key="lock-note">
            <DropdownMenuItemIcon
              ios={{
                name: isPrivate ? "lock.open" : "lock",
                weight: "semibold",
                scale: "medium",
              }}
              androidIconName="archive_box"
            />
            <DropdownMenuItemTitle>
              {isPrivate ? "Unlock" : "Lock"}
            </DropdownMenuItemTitle>
          </DropdownMenuItem>
        )}
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
