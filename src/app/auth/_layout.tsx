import { Header, HeaderBackButton } from "@react-navigation/elements";
import { X } from "@tamagui/lucide-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Circle } from "tamagui";

export default function AuthLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        header: () => (
          <Header
            headerStatusBarHeight={0}
            title=""
            headerRight={() => (
              <HeaderBackButton
                backImage={({ tintColor }) => (
                  <Circle size="$2" jc="center" ai="center" mx="$2">
                    <X size="$1" color={tintColor} />
                  </Circle>
                )}
                onPress={() => {
                  router.back();
                }}
              />
            )}
          />
        ),
        headerTransparent: false,
        headerShown: true,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="verify" />
    </Stack>
  );
}
