import { Text } from "dripsy";
import React from "react";

import { Button, Input, Spacer, AnimatedKeyboardView } from "components";
import { useVerifyPhoneNumberMutation } from "hooks";

export default function VerifyPage() {
  const { handleVerify, setCode, code } = useVerifyPhoneNumberMutation();
  return (
    <AnimatedKeyboardView offset={40}>
      <Text sx={{ fontSize: "$4" }}>Please verify the code</Text>
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
      <Spacer />
      <Button
        disabled={!code}
        variantStyle="Filled"
        size="Large"
        onPress={handleVerify}
      >
        <Button.Label>Login</Button.Label>
      </Button>
    </AnimatedKeyboardView>
  );
}
