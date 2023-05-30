import React from "react";
import { Text } from "react-native";
import { Button, FormScrollContainer, Input, Spacing } from "components";
import { Stack, useLocalSearchParams } from "expo-router";
import { Auth } from "config";

export default function VerifyPage() {
  const [code, setCode] = React.useState("");
  const { verificationId } = useLocalSearchParams();

  const handleLogin = React.useCallback(async () => {
    await Auth.verifyOTP(code, verificationId as string);
  }, [code, verificationId]);

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
        value={code}
        onChangeText={setCode}
      />
      <Spacing size={6} />
      <Button label="Login" onPress={handleLogin} />
    </FormScrollContainer>
  );
}
