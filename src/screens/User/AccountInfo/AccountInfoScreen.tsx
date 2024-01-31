import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Pencil } from "@tamagui/lucide-icons";
import React, { useRef } from "react";
import { Separator, YGroup, ListItem } from "tamagui";

import { AccountInfoContainer, UpdateAccountSheet } from "components";

// import { useAuth } from "contexts";

export default function AccountInfoScreen() {
  // const { user } = useAuth();
  const sheetRef = useRef<BottomSheetModal>(null);

  return (
    <AccountInfoContainer>
      <YGroup bordered separator={<Separator />}>
        <YGroup.Item>
          <ListItem
            href="/"
            title="Display Name"
            // subTitle={user?.displayName ?? ""}
            iconAfter={Pencil}
            onPress={() => sheetRef.current?.present()}
          />
        </YGroup.Item>
        <YGroup.Item>
          <ListItem
            href="/"
            title="Email"
            // subTitle={user?.email ?? ""}
          />
        </YGroup.Item>
        <YGroup.Item>
          <ListItem
            href="/"
            title="Phone Number"
            // subTitle={user?.phoneNumber ?? ""}
          />
        </YGroup.Item>
      </YGroup>
      <UpdateAccountSheet ref={sheetRef} type="displayName" />
    </AccountInfoContainer>
  );
}
