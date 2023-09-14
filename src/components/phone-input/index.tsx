import React from "react";
import { Control, Controller } from "react-hook-form";
import { Input, View, XStack } from "tamagui";

import CountryBottomSheet from "components/country-bottom-sheet";

interface Props {
  control: Control<
    {
      phoneNumber: string;
      country: string;
    },
    any
  >;
}

export default function PhoneInput({ control }: Props) {
  return (
    <XStack gap={8}>
      <Controller
        control={control}
        name="country"
        render={({ field: { onChange, value } }) => (
          <CountryBottomSheet region={value} onRegionChange={onChange} />
        )}
      />
      <View flex={1}>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              size="$5"
              textContentType="telephoneNumber"
              autoComplete="tel"
              keyboardType="phone-pad"
              placeholder="Phone Number"
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              textAlignVertical="center"
              onChangeText={onChange}
              onBlur={onBlur}
              fontVariant={["tabular-nums"]}
              maxLength={15}
            />
          )}
        />
      </View>
    </XStack>
  );
}
