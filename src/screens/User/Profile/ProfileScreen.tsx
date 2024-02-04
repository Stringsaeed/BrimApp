import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { YGroup, ListItem, Separator, Spacer } from "tamagui";

import { ResetDatabaseListItem, ScreenContainer } from "components";
import { Routes } from "routers";

import styles from "./ProfileScreen.styles";

export default function Profile() {
  const navigation = useNavigation();
  const { t } = useTranslation("settings");

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
      <YGroup bordered>
        <YGroup.Item>
          <ListItem
            onPress={navigateToFactory(Routes.AccountInfo)}
            title={t("accountInformation")}
            disabled
          />
        </YGroup.Item>
        <Separator />
        <YGroup.Item>
          <ListItem title={t("notifications")} disabled />
        </YGroup.Item>
        <Separator />
        <YGroup.Item>
          <ListItem
            title={t("preferences")}
            onPress={navigateToFactory(Routes.Preferences)}
          />
        </YGroup.Item>
      </YGroup>
      <Spacer />
      <YGroup bordered>
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
