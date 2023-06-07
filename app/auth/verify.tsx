import React from "react";
import { View, Text } from "react-native";

import { Spacing, Button, Input } from "components";
import { useVerifyPhoneNumberMutation } from "hooks";
import { theme } from "themes";

export default function VerifyPage() {
  const { code, setCode, handleVerify } = useVerifyPhoneNumberMutation();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <Text>Verify</Text>
        <Spacing size={6} />
        <Input
          textAlign="center"
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

        <Button label="Login" onPress={handleVerify} />
      </View>
    </View>
  );
}
