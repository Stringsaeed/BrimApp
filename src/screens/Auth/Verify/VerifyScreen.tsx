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
    <AuthLayout>
      <View
        bg="$red1"
        pos="absolute"
        flex={1}
        bottom={0}
        left={0}
        right={0}
        top={0}
      />
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
        onChangeText={onCodeChangeText}
      />
      <Spacer />
      <Button
        borderColor="$accent"
        bg="$accent"
        size="$5"
        width="100%"
        opacity={!code ? 0.5 : 1}
        disabled={!code}
        onPress={onSubmit}
        textProps={{ color: "$background" }}
      >
        Login
      </Button>
      <View />
    </AuthLayout>
  );
}