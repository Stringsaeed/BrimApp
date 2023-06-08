import React from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";

import { AuthProvider, NotesProvider, QueryProvider } from "contexts";
import { fonts, theme } from "themes";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded] = useFonts({
    [fonts.regular]: DMSans_400Regular,
    [fonts.regularItalic]: DMSans_400Regular_Italic,
    [fonts.bold]: DMSans_700Bold,
    [fonts.semiBold]: DMSans_500Medium,
    [fonts.semiBoldItalic]: DMSans_500Medium_Italic,
    [fonts.boldItalic]: DMSans_700Bold_Italic,
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
              headerTitleStyle: theme.textVariants.Headline,
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
