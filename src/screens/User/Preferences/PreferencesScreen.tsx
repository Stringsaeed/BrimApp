import React from "react";
import { Separator, View, YGroup } from "tamagui";
import SelectAccentListItem from "@/components/select-accent-list-item";
import SelectThemeListItem from "@/components/select-theme-list-item";
export default function PreferencesScreen() {
  return (
    <View f={1} px="$4" py="$4.5">
      <YGroup bordered>
        <SelectThemeListItem />
        <Separator />
        <SelectAccentListItem />
      </YGroup>
    </View>
  );
}
