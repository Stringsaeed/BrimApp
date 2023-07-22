import React from "react";

import { Button, Input, Headline } from "components";
import { useVerifyPhoneNumberMutation } from "hooks";

export default function VerifyPage() {
  const { handleVerify, setCode, code } = useVerifyPhoneNumberMutation();
  return (
    <>
      <Headline>Verify</Headline>
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
      <Button label="Login" onPress={handleVerify} />
    </>
  );
}
