import React from "react";
import { StyleSheet } from "react-native";

import { Button, ListItem, ScreenContainer, Spacer } from "components";
// import { useAuth } from "contexts";
import { useSignOutMutation } from "hooks";

export default function Profile() {
  // const { user } = useAuth();
  const signOutMutation = useSignOutMutation();

  return (
    <ScreenContainer
      style={styles.container}
      handleSafeArea="bottom"
      // handleKeyboard
      type="fixed"
    >
      <ListItem href="/account-info" isFirst title="Account Information" />
      <ListItem href="/account-info" title="Notifications Settings" />
      <ListItem href="/account-info" isLast title="Preferences" />
      <Spacer />
      <Button
        onPress={() => signOutMutation.mutate()}
        variant="warning"
        label="Sign out"
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 24 },
});
