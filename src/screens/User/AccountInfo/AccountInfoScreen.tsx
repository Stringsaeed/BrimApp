import React from "react";
import { Separator, YGroup } from "tamagui";

import { AccountInfoContainer, UpdateAccountListItem } from "components";
import { useAuthentication } from "contexts";

// import { useAuth } from "contexts";

export default function AccountInfoScreen() {
  const { user } = useAuthentication();

  return (
    <AccountInfoContainer>
      <YGroup bordered separator={<Separator />}>
        <UpdateAccountListItem
          title="Display Name"
          subTitle={user?.user_metadata?.displayName ?? ""}
          type="displayName"
        />
        <UpdateAccountListItem
          title="Email"
          subTitle={user?.email ?? ""}
          type="email"
        />
        <UpdateAccountListItem
          title="Phone"
          subTitle={user?.phone ?? ""}
          type="phone"
        />
      </YGroup>
    </AccountInfoContainer>
  );
}
