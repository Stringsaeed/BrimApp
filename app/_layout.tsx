import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";

import { AuthProvider, NotesProvider, QueryProvider } from "contexts";
import { theme } from "themes";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded] = useFonts({
    Lato: Lato_400Regular,
    "Lato-Bold": Lato_700Bold,
  });

  if (!loaded) {
    return null;
  }

  return (
    <QueryProvider>
      <AuthProvider>
        <NotesProvider>
          <Stack
            screenOptions={{
              headerTintColor: "#000",
              headerBackTitleVisible: false,
              headerTitleStyle: theme.textVariants.heading,
              headerTransparent: true,
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
        </NotesProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
