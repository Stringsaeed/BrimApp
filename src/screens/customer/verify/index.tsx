import React from "react";
import { Input, Button, Heading, View } from "tamagui";

import { Spacer, AuthLayout } from "components";

interface VerifyViewProps {
  code: string;
  onCodeChangeText: (code: string) => void;
  onSubmit: () => void;
}

export default function VerifyView({
  onCodeChangeText,
  onSubmit,
  code,
}: VerifyViewProps) {
  return (
    <AuthLayout>
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
        borderColor="$pink12"
        bg="$pink6"
        size="$5"
        opacity={!code ? 0.5 : 1}
        disabled={!code}
        onPress={onSubmit}
      >
        <Button.Text>Login</Button.Text>
      </Button>
      <View />
    </AuthLayout>
  );
}
