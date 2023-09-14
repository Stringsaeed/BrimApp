import React from "react";
import { View, YGroup } from "tamagui";

import { SelectThemeListItem } from "components";

export default function PreferencesScreen() {
  return (
    <View f={1} px="$4" py="$4.5">
      <YGroup bordered>
        <SelectThemeListItem />
      </YGroup>
    </View>
  );
}
