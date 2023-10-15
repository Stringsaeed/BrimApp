import React from "react";
import { Heading, Text, Button, View } from "tamagui";

import { Spacer, AuthLayout, PhoneInput } from "components";
import { useLoginForm } from "hooks";

export default function LoginScreen() {
  const { isSubmitDisabled, onSubmit, control } = useLoginForm();

  return (
    <AuthLayout>
      <Heading>
        Welcome to <Text fontWeight="$5">Brim</Text>
      </Heading>
      <PhoneInput control={control} />
      <Spacer />
      <Button
        width="100%"
        bg="$accent"
        size="$5"
        color="$background"
        borderRadius="$12"
        opacity={isSubmitDisabled ? 0.5 : 1}
        disabled={isSubmitDisabled}
        onPress={onSubmit}
      >
        Continue
      </Button>
      <View />
    </AuthLayout>
  );
}
