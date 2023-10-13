import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, YGroup, ListItem, Separator } from "tamagui";

import { ScreenContainer, Spacer } from "components";
import { useSignOutMutation } from "hooks";
import { Routes } from "routers";

export default function Profile() {
  const signOutMutation = useSignOutMutation();
  const navigation = useNavigation();

  function navigateToFactory(name: Routes.AccountInfo | Routes.Preferences) {
    return function navigateTo() {
      navigation.navigate(name);
    };
  }

  return (
    <ScreenContainer
      style={styles.container}
      handleSafeArea="bottom"
      type="fixed"
    >
      <YGroup bordered separator={<Separator />}>
        <YGroup.Item>
          <ListItem
            onPress={navigateToFactory(Routes.AccountInfo)}
            title="Account Information"
          />
        </YGroup.Item>
        <YGroup.Item>
          <ListItem title="Notifications Settings" disabled />
        </YGroup.Item>
        <YGroup.Item>
          <ListItem
            title="Preferences"
            onPress={navigateToFactory(Routes.Preferences)}
          />
        </YGroup.Item>
      </YGroup>
      <Spacer />
      <Button
        width="100%"
        bg="$accent"
        // size="$5"
        color="$background"
        borderRadius="$12"
        onPress={() => signOutMutation.mutate()}
      >
        Sign out
      </Button>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 24 },
});
