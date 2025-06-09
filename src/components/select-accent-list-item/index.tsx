import { BottomSheetModal } from "@gorhom/bottom-sheet";
import capitalize from "lodash.capitalize";
import React, { useRef } from "react";
import { Circle, ListItem, RadioGroup, XStack, YGroup } from "tamagui";

import BottomSheet from "@/components/bottom-sheet";
import { useUserAccent } from "@/hooks";
import { UserAccentValue } from "@/types";

const accentOptions = [
  "blue10",
  "gray10",
  "green10",
  "orange10",
  "pink10",
  "purple10",
  "red10",
  "yellow10",
];

export default function SelectAccentListItem() {
  const sheetRef = useRef<BottomSheetModal>(null);
  const { accent: value, onChange } = useUserAccent();

  const onValueChange = (value: string) => {
    onChange(value as UserAccentValue);
  };

  const subtitle = capitalize(value).replace("10", "");

  return (
    <>
      <YGroup.Item>
        <ListItem
          title="Accent Color"
          subTitle={subtitle}
          onPress={() => {
            sheetRef.current?.present();
          }}
          iconAfter={({ size }: { size: any }) => (
            <Circle size={size} bg={`$${value}`} />
          )}
        />
      </YGroup.Item>
      <BottomSheet
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        ref={sheetRef}
        title="Accent Color"
        subtitle="Make it yours!"
      >
        <RadioGroup
          value={value}
          onValueChange={onValueChange}
          bg="$backgroundTransparent"
        >
          <XStack alignItems="center" jc="space-between">
            {accentOptions.map((accent) => (
              <RadioGroup.Item
                size="$5"
                bg={`$${accent}`}
                value={accent}
                key={accent}
              >
                <RadioGroup.Indicator />
              </RadioGroup.Item>
            ))}
          </XStack>
        </RadioGroup>
      </BottomSheet>
    </>
  );
}
