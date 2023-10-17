import React from "react";
import { Input, Button, Heading, View } from "tamagui";

import { Spacer, AuthLayout } from "components";
import { useVerifyPhoneNumberMutation } from "hooks";

export default function VerifyView() {
  const {
    setCode: onCodeChangeText,
    handleVerify: onSubmit,
    code,
  } = useVerifyPhoneNumberMutation();

  return (
    <AuthLayout handleTopSafeArea={false}>
      <Heading>Please verify the code</Heading>
      <Input
        borderRadius="$12"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        keyboardType="number-pad"
        placeholder="Verification Code"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={6}
        value={code}
        onChangeText={onCodeChangeText}
      />
      <Spacer />
      <Button
        width="100%"
        bg="$accent"
        size="$5"
        color="$background"
        borderRadius="$12"
        opacity={!code ? 0.5 : 1}
        disabled={!code}
        onPress={onSubmit}
      >
        Login
      </Button>
      <View />
    </AuthLayout>
  );
}
