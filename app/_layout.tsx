import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

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
                  headerTintColor: "#000",
                  headerBackTitleVisible: false,
                  headerBackground() {
                    return (
                      <LinearGradient flex={1} colors={["$purple5", "beige"]} />
                    );
                  },
                }}
              >
                <Stack.Screen
                  name="(user)/profile"
                  options={{ title: "Profile" }}
                />
                <Stack.Screen
                  name="auth"
                  options={{
                    headerShown: false,
                    headerBackground: () => null,
                    headerTransparent: true,
                  }}
                />
                <Stack.Screen name="notes/[id]" options={{ title: "" }} />
              </Stack>
            </Theme>
          </TamaguiProvider>
        </NotesProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
