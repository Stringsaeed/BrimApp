import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DatabaseProvider } from "@nozbe/watermelondb/react";
import React from "react";
import { I18nextProvider } from "react-i18next";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import { wmDatabase } from "config";
import { NotesProvider, PullToActionProvider, QueryProvider } from "contexts";
import { useUserTheme } from "hooks";
import i18next from "i18n";
import { AppNavigator } from "navigation";
import { FeatureFlagsProvider } from "services";
import { themeConfig } from "themes";

import NavigationProvider from "./navigation-provider";

export default function AppContainer() {
  const { theme } = useUserTheme();

  return (
    <I18nextProvider i18n={i18next}>
      <FeatureFlagsProvider>
        <TamaguiProvider defaultTheme={theme} config={themeConfig}>
          <QueryProvider>
            <DatabaseProvider database={wmDatabase}>
              <NotesProvider>
                <GestureHandlerRootView style={styles.rootView}>
                  <SafeAreaProvider>
                    <BottomSheetModalProvider>
                      <PullToActionProvider>
                        <NavigationProvider>
                          {/* <PostHogProvider autocapture client={Analytics.postHug}> */}
                          <AppNavigator />
                          {/* </PostHogProvider> */}
                        </NavigationProvider>
                      </PullToActionProvider>
                    </BottomSheetModalProvider>
                  </SafeAreaProvider>
                </GestureHandlerRootView>
              </NotesProvider>
            </DatabaseProvider>
          </QueryProvider>
        </TamaguiProvider>
      </FeatureFlagsProvider>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});
