import { ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { BlurEffectTypes } from "react-native-screens";

import { DashboardScreen, NotesScreens, UserScreens } from "screens";

export default function createAppGroup<
  ParamsList extends ParamListBase,
  ThemeName extends "light" | "dark" | (string & {})
>(
  creator: ReturnType<typeof createNativeStackNavigator<ParamsList>>,
  themeName: ThemeName
) {
  return (
    <creator.Group>
      <creator.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerTransparent: true,
          headerShown: true,
          title: "",
        }}
      />
      <creator.Screen
        name="Note"
        component={NotesScreens.Note}
        options={{
          headerTransparent: true,
          headerShown: true,
          title: "",
        }}
      />
      <creator.Screen
        name="Archive"
        component={NotesScreens.Archived}
        options={{
          headerBlurEffect: themeName as BlurEffectTypes,
          headerTransparent: true,
          title: "Archived",
          headerShown: true,
        }}
      />
      <creator.Screen
        name="Trash"
        component={NotesScreens.Trashed}
        options={{
          headerBlurEffect: themeName as BlurEffectTypes,
          headerTransparent: true,
          headerShown: true,
          title: "Trash",
        }}
      />
      <creator.Screen
        name="Profile"
        component={UserScreens.Profile}
        options={{
          headerBackTitleVisible: false,
          headerBackTitle: "",
          title: "Profile",
        }}
      />
      <creator.Screen
        name="AccountInfo"
        component={UserScreens.AccountInfo}
        options={{
          headerBackTitleVisible: false,
          title: "Account Information",
          headerBackTitle: "",
        }}
      />
      <creator.Screen
        name="Preferences"
        component={UserScreens.Preferences}
        options={{
          headerBackTitleVisible: false,
          title: "Preferences",
          headerBackTitle: "",
        }}
      />
    </creator.Group>
  );
}
