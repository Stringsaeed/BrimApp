import { LogOut } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { YGroup, ListItem, Separator, Spacer } from "tamagui";

import { ResetDatabaseListItem, ScreenContainer } from "components";
import { useAuthentication } from "contexts";
import { Routes } from "routers";
import supabaseClient from "services/supabase";

import styles from "./ProfileScreen.styles";

export default function Profile() {
  const router = useRouter();
  const { t } = useTranslation("settings");
  const { t: tAuth } = useTranslation("auth");

  const { isAuthenticated, user } = useAuthentication();

  function navigateToFactory(
    name: Routes.AccountInfo | Routes.Preferences | Routes.Login
  ) {
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
          {isAuthenticated ? (
            <ListItem
              title={user?.email}
              onPress={navigateToFactory(Routes.AccountInfo)}
            />
          ) : (
            <ListItem
              title={tAuth("login.description")}
              onPress={navigateToFactory(Routes.Login)}
            />
          )}
        </YGroup.Item>
      </YGroup>

      <Spacer />

      <YGroup bordered bg="$backgroundTransparent">
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
      <Spacer />
      {isAuthenticated ? (
        <YGroup bordered>
          <ListItem
            icon={LogOut}
            title="Logout"
            onPress={() => {
              void supabaseClient.auth.signOut();
            }}
          />
        </YGroup>
      ) : null}
    </ScreenContainer>
  );
}
