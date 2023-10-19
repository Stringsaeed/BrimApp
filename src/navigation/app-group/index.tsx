import { ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { Routes } from "routers";
import { DashboardScreen, NotesScreens, UserScreens } from "screens";

export default function createAppGroup<
  ParamsList extends ParamListBase,
  ThemeName extends "light" | "dark" | (string & {})
>(
  creator: ReturnType<typeof createNativeStackNavigator<ParamsList>>,
  _: ThemeName
) {
  return (
    <creator.Group
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackTitle: "",
        headerShown: true,
      }}
    >
      <creator.Screen
        name={Routes.Dashboard}
        component={DashboardScreen}
        options={{ title: "" }}
      />
      <creator.Screen
        name={Routes.Note}
        component={NotesScreens.Note}
        options={{ headerTransparent: true, title: "" }}
      />
      <creator.Screen
        name={Routes.Archive}
        component={NotesScreens.Archived}
        options={{
          title: "Archived",
        }}
      />
      <creator.Screen
        name={Routes.Trash}
        component={NotesScreens.Trashed}
        options={{
          title: "Trash",
        }}
      />
      <creator.Screen
        name={Routes.Profile}
        component={UserScreens.Profile}
        options={{ title: "Profile" }}
      />
      <creator.Screen
        name={Routes.AccountInfo}
        component={UserScreens.AccountInfo}
        options={{ title: "Account Information" }}
      />
      <creator.Screen
        name={Routes.Preferences}
        component={UserScreens.Preferences}
        options={{ title: "Preferences" }}
      />
    </creator.Group>
  );
}
