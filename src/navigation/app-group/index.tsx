import { ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform } from "react-native";
import { BlurEffectTypes } from "react-native-screens";

import AccountInfoScreen from "app/(user)/account-info";
import Profile from "app/(user)/profile";
import NotePage from "app/notes/[id]";
import ArchiveNotesPage from "app/notes/archive";
import TrashedNotes from "app/notes/trash";
import { ArchivedNotesHeaderBackground } from "components";
import { DashboardScreen, PreferencesView } from "screens";

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
          headerBlurEffect: themeName as BlurEffectTypes,
          headerTransparent: true,
          headerShown: true,
          title: "",
        }}
      />
      <creator.Screen
        name="Note"
        component={NotePage}
        options={{
          headerTransparent: true,
          headerShown: true,
          title: "",
        }}
      />
      <creator.Screen
        name="Archive"
        component={ArchiveNotesPage}
        options={{
          headerBackground:
            Platform.OS !== "ios" ? ArchivedNotesHeaderBackground : undefined,
          headerBlurEffect: themeName as BlurEffectTypes,
          headerTransparent: true,
          title: "Archived",
          headerShown: true,
        }}
      />
      <creator.Screen
        name="Trash"
        component={TrashedNotes}
        options={{
          headerBackground:
            Platform.OS !== "ios" ? ArchivedNotesHeaderBackground : undefined,
          headerBlurEffect: themeName as BlurEffectTypes,
          headerTransparent: true,
          headerShown: true,
          title: "Trash",
        }}
      />
      <creator.Screen
        name="Profile"
        component={Profile}
        options={{
          headerBackTitleVisible: false,
          headerBackTitle: "",
          title: "Profile",
        }}
      />
      <creator.Screen
        name="AccountInfo"
        component={AccountInfoScreen}
        options={{
          headerBackTitleVisible: false,
          title: "Account Information",
          headerBackTitle: "",
        }}
      />
      <creator.Screen
        name="Preferences"
        component={PreferencesView}
        options={{
          headerBackTitleVisible: false,
          title: "Preferences",
          headerBackTitle: "",
        }}
      />
    </creator.Group>
  );
}
