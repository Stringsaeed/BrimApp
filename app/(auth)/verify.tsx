import React from "react";

import { Button, FormScrollContainer, Input, Spacing, Title } from "components";
import { useVerifyPhoneNumberMutation } from "hooks";

export default function VerifyPage() {
  const { code, setCode, handleVerify } = useVerifyPhoneNumberMutation();

  return (
    <FormScrollContainer centerContent>
      <Title>Verify</Title>
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
      <Button label="Login" onPress={handleVerify} />
    </FormScrollContainer>
  );
}
