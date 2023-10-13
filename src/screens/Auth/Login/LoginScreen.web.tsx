import React, { Fragment } from "react";
import { View, Button, Spacer, Text, Card } from "tamagui";

import { AuthLayout, PhoneInput } from "components";
import { useRecaptchaVerifier } from "hooks";

import { LoginViewProps } from "./types";

export default function LoginView({
  isSubmitDisabled,
  onSubmit,
  control,
}: LoginViewProps) {
  useRecaptchaVerifier();
  return (
    <AuthLayout
      heading={
        <Fragment>
          Welcome to <Text fontWeight="$5">Brim</Text>
        </Fragment>
      }
    >
      <PhoneInput control={control} />
      <Spacer />
      <Card.Footer>
        <View maxWidth={400} px="$3.5" flex={1}>
          <Button
            bg="$accent"
            size="$5"
            width="100%"
            opacity={isSubmitDisabled ? 0.5 : 1}
            disabled={isSubmitDisabled}
            onPress={onSubmit}
          >
            <Button.Text>Continue</Button.Text>
          </Button>
        </View>
      </Card.Footer>
      <View nativeID="sign-in-button" />
    </AuthLayout>
  );
}
