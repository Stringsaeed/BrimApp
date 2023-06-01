import React from "react";

import { Button, FormScrollContainer, Input, Spacing, Title } from "components";
import useSignInWithPhoneNumberMutation from "hooks/use-sign-in-with-phone-number-mutation";

export default function LoginPage() {
  const { handleSubmit, phoneNumber, setPhoneNumber } =
    useSignInWithPhoneNumberMutation();

  return (
    <FormScrollContainer centerContent>
      <Title>What&apos;s your phone number</Title>
      <Spacing size={6} />
      <Input
        textContentType="telephoneNumber"
        autoComplete="tel"
        keyboardType="phone-pad"
        placeholder="Phone Number"
        autoCapitalize="none"
        autoCorrect={false}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Spacing size={6} />
      <Button label="continue" onPress={handleSubmit} />
    </FormScrollContainer>
  );
}
