import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AccountInfoScreen from "app/(user)/account-info";
import Profile from "app/(user)/profile";
import NotePage from "app/notes/[id]";
import ArchiveNotesPage from "app/notes/archive";
import TrashedNotes from "app/notes/trash";
import { RootStackParamList } from "routers";
import { DashboardScreen } from "screens";

export default function createAppGroup(
  creator: ReturnType<typeof createNativeStackNavigator<RootStackParamList>>
) {
  return (
    <creator.Group>
      <creator.Screen name="Dashboard" component={DashboardScreen} />
      <creator.Screen name="Note" component={NotePage} />
      <creator.Screen name="Archive" component={ArchiveNotesPage} />
      <creator.Screen name="Trash" component={TrashedNotes} />
      <creator.Screen name="Profile" component={Profile} />
      <creator.Screen name="AccountInfo" component={AccountInfoScreen} />
    </creator.Group>
  );
}
