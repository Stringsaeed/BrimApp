import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { ListItem, View, YGroup } from "tamagui";

import { SelectTheme } from "components";
import { useUserTheme } from "hooks";

export default function PreferencesScreen() {
  const sheetRef = useRef<BottomSheetModal>(null);
  const { setUserThemeAuto, userThemeAuto, setUserTheme, theme } =
    useUserTheme();

  return (
    <View f={1}>
      <YGroup>
        <YGroup.Item>
          <ListItem
            title="Theme"
            subTitle={theme}
            onPress={() => {
              sheetRef.current?.present();
            }}
          />
        </YGroup.Item>
      </YGroup>
      <SelectTheme
        ref={sheetRef}
        value={userThemeAuto ? "system" : (theme as "light" | "dark")}
        onChange={(value) => {
          if (value === "system") {
            setUserThemeAuto(true);
          } else if (value === "light") {
            setUserThemeAuto(false);
            setUserTheme("light");
          } else if (value === "dark") {
            setUserThemeAuto(false);
            setUserTheme("dark");
          }
        }}
      />
    </View>
  );
}
