import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { YGroup, ListItem, Separator, Spacer } from "tamagui";

import { ResetDatabaseListItem, ScreenContainer } from "components";
import { Routes } from "routers";

import styles from "./ProfileScreen.styles";

export default function Profile() {
  const router = useRouter();
  const { t } = useTranslation("settings");

  function navigateToFactory(name: Routes.AccountInfo | Routes.Preferences) {
    return function navigateTo() {
      router.push(name);
    };
  }

  return (
    <ScreenContainer
      style={styles.container}
      handleSafeArea="bottom"
      type="fixed"
    >
      <YGroup bordered bg="$backgroundTransparent">
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
    </ScreenContainer>
  );
}
