import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import ArchivedNotesHeaderBackground from "./background";

const headerBackground = () => <ArchivedNotesHeaderBackground />;

export default function ArchivedNotesHeader() {
  return (
    <Stack.Screen
      options={{
        headerBackground: Platform.OS !== "ios" ? headerBackground : undefined,
        headerBlurEffect: "light",
        headerTransparent: true,
        headerShown: true,
        title: "Archived",
      }}
    />
  );
}
