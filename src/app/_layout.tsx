/* eslint-disable import/no-extraneous-dependencies */
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Stack, useNavigationContainerRef } from "expo-router";
import { setBackgroundColorAsync } from "expo-system-ui";
import React, { useEffect, useMemo } from "react";
import { I18nextProvider } from "react-i18next";
import { LogBox, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-get-random-values";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import {
  AuthenticationProvider,
  NotesProvider,
  PullToActionProvider,
  QueryProvider,
} from "contexts";
import { useLoadAssets, useUserAccent, useUserTheme } from "hooks";
import i18next from "i18n";
import { FeatureFlagsProvider, Sentry, navigationIntegration } from "services";
import { themeConfig } from "themes";

LogBox.ignoreLogs([
  '[Reanimated] Property "opacity" of AnimatedComponent(YStack) may be overwritten by a layout animation. Please wrap your component with an animated view and apply the layout animation on the wrapper.',
]);

function AppContainer() {
  const { accent } = useUserAccent();
  const { theme } = useUserTheme();
  const isLoaded = useLoadAssets();
  const ref = useNavigationContainerRef();

  const screenOptions = useMemo<NativeStackNavigationOptions>(() => {
    const selectiveTheme = themeConfig.themes[theme];

    return {
      headerTintColor: selectiveTheme[accent].val,
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      headerBackTitle: "",
    };
  }, [accent, theme]);

  const navigationTheme = useMemo(() => {
    const baseTheme = theme === "dark" ? DarkTheme : DefaultTheme;
    const selectiveTheme = themeConfig.themes[theme];
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: selectiveTheme.background.val,
        primary: selectiveTheme[accent].val,
        text: selectiveTheme.color.val,
      },
    };
  }, [accent, theme]);

  useEffect(() => {
    const selectiveTheme = themeConfig.themes[theme];
    void setBackgroundColorAsync(selectiveTheme[accent].val);
  }, [accent, theme]);

  useEffect(() => {
    if (ref) {
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

  if (!isLoaded) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18next}>
      <FeatureFlagsProvider>
        <TamaguiProvider defaultTheme={theme} config={themeConfig}>
          <ThemeProvider value={navigationTheme}>
            <QueryProvider>
              <NotesProvider>
                <GestureHandlerRootView style={styles.rootView}>
                  <SafeAreaProvider>
                    <BottomSheetModalProvider>
                      <AuthenticationProvider>
                        <PullToActionProvider>
                          <Stack screenOptions={screenOptions}>
                            <Stack.Screen
                              name="(app)/index"
                              options={{ title: "" }}
                            />
                            <Stack.Screen
                              name="(app)/notes/[id]"
                              options={{ headerTransparent: true, title: "" }}
                            />
                            <Stack.Screen
                              name="(app)/notes/archived"
                              options={{ title: "Archived" }}
                            />
                            <Stack.Screen
                              name="(app)/notes/trashed"
                              options={{ title: "Trash" }}
                            />
                            <Stack.Screen
                              name="(app)/user/profile"
                              options={{ title: "Settings" }}
                            />
                            <Stack.Screen
                              name="(app)/user/account-info"
                              options={{ title: "Account Information" }}
                            />
                            <Stack.Screen
                              name="(app)/user/preferences"
                              options={{ title: "Preferences" }}
                            />
                            <Stack.Screen
                              name="auth"
                              options={{
                                headerTransparent: true,
                                presentation: "modal",
                                title: "",
                              }}
                            />
                          </Stack>
                        </PullToActionProvider>
                      </AuthenticationProvider>
                    </BottomSheetModalProvider>
                  </SafeAreaProvider>
                </GestureHandlerRootView>
              </NotesProvider>
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

export default Sentry.wrap(AppContainer);
