import React, { PropsWithChildren } from "react";
import { View } from "tamagui";

export default function AccountInfoContainer({ children }: PropsWithChildren) {
  return (
    <View gap="$5" px="$4" pt="$5" flex={1}>
      {children}
    </View>
  );
}
