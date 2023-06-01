import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";

import { AuthProvider, NotesProvider, QueryProvider } from "contexts";
import { tamaguiConfig } from "config";

export default function Layout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <QueryProvider>
      <AuthProvider>
        <NotesProvider>
          <TamaguiProvider config={tamaguiConfig}>
            <Theme name={colorScheme === "dark" ? "dark" : "light"}>
              <Stack
                screenOptions={{
                  headerTintColor: "#fff",
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                }}
              >
                <Stack.Screen
                  name="(user)/profile"
                  options={{ presentation: "modal" }}
                />
                <Stack.Screen
                  name="(auth)/login"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(auth)/verify"
                  options={{ headerShown: false }}
                />
              </Stack>
            </Theme>
          </TamaguiProvider>
        </NotesProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
