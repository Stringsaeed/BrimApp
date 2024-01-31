import { useNavigation } from "@react-navigation/native";
import React from "react";
import { YGroup, ListItem, Separator, Spacer } from "tamagui";

import { ResetDatabaseListItem, ScreenContainer } from "components";
import { Routes } from "routers";

import styles from "./ProfileScreen.styles";

export default function Profile() {
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
            disabled
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
      {/* @ts-ignore */}
      <Spacer />
      <YGroup bordered separator={<Separator />}>
        <ResetDatabaseListItem />
      </YGroup>
      {/* <Button
        width="100%"
        bg="$accent"
        size="$5"
        color="$background"
        borderRadius="$12"
        onPress={() => signOutMutation.mutate()}
      >
        Sign out
      </Button> */}
    </ScreenContainer>
  );
}
