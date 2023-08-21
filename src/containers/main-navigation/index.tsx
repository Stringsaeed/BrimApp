import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { ArchivedNotesHeaderBackground } from "components";

const ArchivedHeaderBackground = () => <ArchivedNotesHeaderBackground />;

export default function MainNavigation() {
  return (
    <Stack
      screenOptions={{
        // headerTitleStyle: theme.textVariants.Headline,
        // headerTintColor: theme.colors.text,
        headerBackTitleVisible: false,
        headerBackTitle: "",
      }}
    >
      <Stack.Screen
        name="(user)/profile"
        options={{
          headerBackTitleVisible: false,
          headerBackTitle: "",
          title: "Profile",
        }}
      />
      <Stack.Screen
        name="(user)/account-info"
        options={{
          headerBackTitleVisible: false,
          title: "Account Information",
          headerBackTitle: "",
        }}
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
      <Stack.Screen
        name="notes/archive"
        options={{
          headerBackground:
            Platform.OS !== "ios" ? ArchivedHeaderBackground : undefined,
          headerBlurEffect: "light",
          headerTransparent: true,
          title: "Archived",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="notes/trash"
        options={{
          headerBackground:
            Platform.OS !== "ios" ? ArchivedHeaderBackground : undefined,
          headerBlurEffect: "light",
          headerTransparent: true,
          headerShown: true,
          title: "Trash",
        }}
      />
    </Stack>
  );
}
