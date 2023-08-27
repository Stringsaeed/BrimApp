import * as LocalAuthentication from "expo-local-authentication";
import React, { useEffect, useState } from "react";

import {
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuItemTitle,
} from "themes";

interface Props {
  isPrivate?: boolean | null | undefined;
  onPressLock?: () => void;
}
export default function LockNoteDropDownItem({
  onPressLock,
  isPrivate,
}: Props) {
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    (async () => {
      const enrolledLevel = await LocalAuthentication.getEnrolledLevelAsync();
      if (enrolledLevel > 1) {
        setIsEligible(true);
      }
    })();
  }, []);

  if (!isEligible) return null;

  return (
    <DropdownMenuItem onSelect={onPressLock} key="lock-note">
      <DropdownMenuItemIcon
        ios={{
          weight: "semibold",
          scale: "medium",
          name: "lock",
          pointSize: 5,
        }}
        androidIconName="archive_box"
      />
      <DropdownMenuItemTitle>
        {isPrivate ? "Unlock" : "Lock"}
      </DropdownMenuItemTitle>
    </DropdownMenuItem>
  );
}
