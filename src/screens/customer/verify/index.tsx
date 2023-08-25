import React from "react";
import { Input, Button, Heading, View } from "tamagui";

import { Spacer, AnimatedKeyboardView } from "components";
import { useVerifyPhoneNumberMutation } from "hooks";

export default function VerifyPage() {
  const { handleVerify, setCode, code } = useVerifyPhoneNumberMutation();
  return (
    <AnimatedKeyboardView offset={40}>
      <Heading>Please verify the code</Heading>
      <Input
        size="$5"
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
        bg="$pink6"
        size="$5"
        opacity={!code ? 0.5 : 1}
        disabled={!code}
        onPress={() => handleVerify()}
      >
        <Button.Text>Login</Button.Text>
      </Button>
      <View />
    </AnimatedKeyboardView>
  );
}
