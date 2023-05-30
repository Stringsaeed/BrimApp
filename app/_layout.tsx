import React from "react";
import { Stack } from "expo-router";

import { AuthProvider, NotesProvider } from "contexts";

export default function Layout() {
  return (
    <AuthProvider>
      <NotesProvider>
        <Stack
          initialRouteName="(notes)"
          screenOptions={{
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </NotesProvider>
    </AuthProvider>
  );
}
