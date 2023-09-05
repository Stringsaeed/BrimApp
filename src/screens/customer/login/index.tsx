import React from "react";
import { Heading, Text, Button, View } from "tamagui";

import { Spacer, AuthLayout, PhoneInput } from "components";

import { LoginViewProps } from "./types";

export default function LoginView({
  isSubmitDisabled,
  onSubmit,
  control,
}: LoginViewProps) {
  return (
    <AuthLayout>
      <Heading>
        Welcome to <Text fontWeight="$5">Brim</Text>
      </Heading>
      <PhoneInput control={control} />
      <Spacer />
      <Button
        borderColor="$pink12"
        bg="$pink6"
        size="$5"
        width="100%"
        opacity={isSubmitDisabled ? 0.5 : 1}
        disabled={isSubmitDisabled}
        onPress={onSubmit}
      >
        <Button.Text>Continue</Button.Text>
      </Button>
      <View />
    </AuthLayout>
  );
}
