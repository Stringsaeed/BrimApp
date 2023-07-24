import React from "react";
import { StyleSheet } from "react-native";

import { Button, ListItem, ScreenContainer, Spacer } from "components";
import { useSignOutMutation } from "hooks";

export default function Profile() {
  const signOutMutation = useSignOutMutation();

  return (
    <ScreenContainer
      style={styles.container}
      handleSafeArea="bottom"
      type="fixed"
    >
      <ListItem href="/account-info" isFirst title="Account Information" />
      <ListItem href="/account-info" title="Notifications Settings" />
      <ListItem href="/account-info" isLast title="Preferences" />
      <Spacer />
      <Button
        variantStyle="Filled"
        size="Large"
        onPress={signOutMutation.mutate}
      >
        <Button.Label>Sign out</Button.Label>
      </Button>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 24 },
});
