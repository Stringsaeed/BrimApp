import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DatabaseProvider } from "@nozbe/watermelondb/react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Stack } from "expo-router";
import React, { useMemo } from "react";
import { I18nextProvider } from "react-i18next";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import { wmDatabase } from "config";
import { NotesProvider, PullToActionProvider, QueryProvider } from "contexts";
import { useLoadAssets, useUserTheme } from "hooks";
import i18next from "i18n";
import { FeatureFlagsProvider } from "services";
import { themeConfig } from "themes";

export default function AppContainer() {
  const { theme } = useUserTheme();
  const isLoaded = useLoadAssets();

  const screenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({ headerShown: false }),
    []
  );
  const navigationTheme = useMemo(() => {
    const baseTheme = theme === "dark" ? DarkTheme : DefaultTheme;
    const selectiveTheme = themeConfig.themes[theme];
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: selectiveTheme.background.val,
        primary: selectiveTheme.accent.val,
        text: selectiveTheme.color.val,
      },
    };
  }, [theme]);

  if (!isLoaded) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18next}>
      <FeatureFlagsProvider>
        <TamaguiProvider defaultTheme={theme} config={themeConfig}>
          <ThemeProvider value={navigationTheme}>
            <QueryProvider>
              <DatabaseProvider database={wmDatabase}>
                <NotesProvider>
                  <GestureHandlerRootView style={styles.rootView}>
                    <SafeAreaProvider>
                      <BottomSheetModalProvider>
                        <PullToActionProvider>
                          <Stack screenOptions={screenOptions} />
                        </PullToActionProvider>
                      </BottomSheetModalProvider>
                    </SafeAreaProvider>
                  </GestureHandlerRootView>
                </NotesProvider>
              </DatabaseProvider>
            </QueryProvider>
          </ThemeProvider>
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
