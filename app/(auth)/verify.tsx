import React from "react";
import { Text } from "react-native";
import { Button, FormScrollContainer, Input, Spacing } from "components";
import { Stack } from "expo-router";

export default function VerifyPage() {
  return (
    <FormScrollContainer centerContent>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "My home",
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      />
      <Text style={{ fontSize: 36, fontWeight: "700" }}>Verify</Text>
      <Spacing size={6} />

      <Input
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        keyboardType="number-pad"
        placeholder="Verification Code"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={6}
      />
      <Spacing size={6} />
      <Button label="Login" />
    </FormScrollContainer>
  );
}
