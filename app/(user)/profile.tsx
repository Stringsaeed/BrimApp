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
      <ListItem isFirst size="lg" title="Account Information" />
      <ListItem size="lg" title="Security Settings" />
      <ListItem size="lg" title="Notifications Settings" />
      <ListItem
        isLast
        size="lg"
        title="Other Settings"
        subtitle="theme, languages"
      />
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
