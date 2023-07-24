import React from "react";
import { View } from "react-native";

import { AccountInfoContainer, AddEmailBanner, ListItem } from "components";
import { useAuth } from "contexts";

export default function AccountInfoScreen() {
  const { user } = useAuth();

  return (
    <AccountInfoContainer>
      <AddEmailBanner />
      <View>
        <ListItem
          isFirst
          href="/"
          size="lg"
          disabled
          title="Display Name"
          subtitle={user?.displayName ?? ""}
        />
        <ListItem
          href="/"
          disabled
          size="lg"
          title="Email"
          subtitle={user?.email ?? ""}
        />
        <ListItem
          isLast
          href="/"
          disabled
          size="lg"
          title="Phone Number"
          subtitle={user?.phoneNumber ?? ""}
        />
      </View>
    </AccountInfoContainer>
  );
}
