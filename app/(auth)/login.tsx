import React from "react";
import { Text } from "react-native";
import { Button, FormScrollContainer, Input, Spacing } from "components";
import { useRouter } from "expo-router";

export default function LoginPage() {
  const router = useRouter();
  return (
    <FormScrollContainer centerContent>
      <Text style={{ fontSize: 36, fontWeight: "700" }}>Login</Text>
      <Spacing size={6} />
      <Input
        textContentType="telephoneNumber"
        autoComplete="tel"
        keyboardType="phone-pad"
        placeholder="Phone Number"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacing size={6} />
      <Button label="continue" onPress={() => router.push("/verify")} />
    </FormScrollContainer>
  );
}
