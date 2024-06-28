import React from "react";
import { Separator, View, YGroup } from "tamagui";

import { SelectAccentListItem, SelectThemeListItem } from "components";

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
