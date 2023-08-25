import React from "react";
import { Separator, YGroup, ListItem } from "tamagui";

import { AccountInfoContainer } from "components";
import { useAuth } from "contexts";

export default function AccountInfoScreen() {
  const { user } = useAuth();

  return (
    <AccountInfoContainer>
      <YGroup bordered separator={<Separator />}>
        <YGroup.Item>
          <ListItem
            href="/"
            title="Display Name"
            subTitle={user?.displayName ?? ""}
          />
        </YGroup.Item>
        <YGroup.Item>
          <ListItem href="/" title="Email" subTitle={user?.email ?? ""} />
        </YGroup.Item>
        <YGroup.Item>
          <ListItem
            href="/"
            title="Phone Number"
            subTitle={user?.phoneNumber ?? ""}
          />
        </YGroup.Item>
      </YGroup>
    </AccountInfoContainer>
  );
}
