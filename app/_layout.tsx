import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";

import { AuthProvider, NotesProvider, QueryProvider } from "contexts";
import { useLoadAssets } from "hooks";
import { theme } from "themes";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const loaded = useLoadAssets();

  if (!loaded) {
    return null;
  }

  return (
    <QueryProvider>
      <AuthProvider>
        <NotesProvider>
          <Stack
            screenOptions={{
              headerTitleStyle: theme.textVariants.Headline,
              headerBackTitleVisible: false,
              headerTintColor: "#000",
            }}
          >
            <Stack.Screen
              name="(user)/profile"
              options={{ title: "Profile" }}
            />
            <Stack.Screen
              name="auth"
              options={{
                headerBackground: () => null,
                headerTransparent: true,
                headerShown: false,
              }}
            />
            <Stack.Screen name="notes/[id]" options={{ title: "" }} />
          </Stack>
        </NotesProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
