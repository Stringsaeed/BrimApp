import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Moon, Settings, Sun } from "@tamagui/lucide-icons";
import capitalize from "lodash.capitalize";
import React, { useRef } from "react";
import { ListItem, Separator, YGroup } from "tamagui";

import BottomSheet from "@/components/bottom-sheet";
import { useUserTheme } from "@/hooks";
import { UserThemeValue } from "@/types";

import SelectThemeItem from "./select-theme-item";

const getIconByValue = (value: UserThemeValue) => {
  switch (value) {
    case "system":
      return Settings;
    case "light":
      return Sun;
    case "dark":
      return Moon;
  }
};

export default function SelectThemeListItem() {
  const sheetRef = useRef<BottomSheetModal>(null);
  const { themeName: value, onChange } = useUserTheme();
  const Icon = getIconByValue(value);

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
          iconAfter={Icon}
        />
      </YGroup.Item>
      <BottomSheet
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        ref={sheetRef}
        title="Select Theme"
      >
        <YGroup bordered bg="$backgroundTransparent">
          <SelectThemeItem
            title="System"
            onPress={onPressFactory("system")}
            selected={value === "system"}
            icon={Settings}
          />
          <Separator />
          <SelectThemeItem
            title="Light"
            onPress={onPressFactory("light")}
            selected={value === "light"}
            icon={Sun}
          />
          <Separator />
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
