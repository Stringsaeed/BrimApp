import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Spacing, Button, Input } from "components";
import { useVerifyPhoneNumberMutation } from "hooks";
import { theme } from "themes";

export default function VerifyPage() {
  const { code, setCode, handleVerify } = useVerifyPhoneNumberMutation();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
