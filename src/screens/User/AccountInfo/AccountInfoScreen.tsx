import React from "react";
import { Separator, YGroup } from "tamagui";
import AccountInfoContainer from "@/components/account-info-container";
import UpdateAccountListItem from "@/components/update-account-list-item";
import { useAuthentication } from "@/contexts/auth";
// import { useAuth } from "@/contexts";
export default function AccountInfoScreen() {
  const { user } = useAuthentication();
  return (
    <AccountInfoContainer>
      <YGroup bordered ov="hidden">
        <UpdateAccountListItem
          title="Display Name"
          subTitle={user?.user_metadata?.displayName ?? ""}
          type="displayName"
        />
        <Separator />
        <UpdateAccountListItem
          title="Email"
          subTitle={user?.email ?? ""}
          type="email"
        />
        <Separator />
        <UpdateAccountListItem
          title="Phone"
          subTitle={user?.phone ?? ""}
          type="phone"
        />
      </YGroup>
    </AccountInfoContainer>
  );
}
