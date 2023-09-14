import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Settings, Sun, Moon } from "@tamagui/lucide-icons";
import capitalize from "lodash.capitalize";
import React, { useRef } from "react";
import { ListItem, Separator, YGroup } from "tamagui";

import BottomSheet from "components/bottom-sheet";
import { useUserTheme } from "hooks";
import { UserThemeValue } from "types";

import SelectThemeItem from "./select-theme-item";

export default function SelectThemeListItem() {
  const sheetRef = useRef<BottomSheetModal>(null);
  const { themeName: value, onChange } = useUserTheme();

  const onPressFactory = (value: UserThemeValue) => () => {
    onChange(value);
  };

  return (
    <>
      <YGroup.Item>
        <ListItem
          title="Theme"
          subTitle={capitalize(value)}
          onPress={() => {
            sheetRef.current?.present();
          }}
        />
      </YGroup.Item>
      <BottomSheet
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        ref={sheetRef}
        title="Select Theme"
      >
        <YGroup bordered separator={<Separator />} bg="$backgroundTransparent">
          <SelectThemeItem
            title="System"
            onPress={onPressFactory("system")}
            selected={value === "system"}
            icon={Settings}
          />
          <SelectThemeItem
            title="Light"
            onPress={onPressFactory("light")}
            selected={value === "light"}
            icon={Sun}
          />
          <SelectThemeItem
            title="Dark"
            onPress={onPressFactory("dark")}
            selected={value === "dark"}
            icon={Moon}
          />
        </YGroup>
      </BottomSheet>
    </>
  );
}
