import React from "react";
import { Text } from "react-native";
import { Button, FormScrollContainer, Input, Spacing } from "components";
import { useRouter } from "expo-router";
import { Auth } from "config";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const router = useRouter();

  const handleContinue = React.useCallback(async () => {
    await Auth.sendPhoneOTP(phoneNumber);
    router.push("/auth/verify");
  }, [phoneNumber, router]);

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
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Spacing size={6} />
      <Button label="continue" onPress={handleContinue} />
    </FormScrollContainer>
  );
}
