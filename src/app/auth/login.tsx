import React from "react";

import { Button, Input, Headline } from "components";
import { useLoginMutation } from "hooks";

export default function LoginPage() {
  const { setPhoneNumber, handleSubmit, phoneNumber } = useLoginMutation();

  return (
    <>
      <Headline>What&apos;s your phone number</Headline>
      <Input
        textAlign="center"
        textContentType="telephoneNumber"
        autoComplete="tel"
        keyboardType="phone-pad"
        placeholder="Phone Number"
        autoCapitalize="none"
        autoCorrect={false}
        value={phoneNumber}
        textAlignVertical="center"
        onChangeText={setPhoneNumber}
      />
      <Button
        disabled={!phoneNumber}
        variantStyle="Filled"
        size="Large"
        onPress={handleSubmit}
      >
        <Button.Label>Continue</Button.Label>
      </Button>
    </>
  );
}
