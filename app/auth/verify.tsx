import React from "react";
import { Button, Form, Heading, Input, Spinner, Stack } from "tamagui";

import { Spacing } from "components";
import { useVerifyPhoneNumberMutation } from "hooks";

export default function VerifyPage() {
  const { code, setCode, handleVerify, isLoading } =
    useVerifyPhoneNumberMutation();

  return (
    <Form onSubmit={handleVerify} flex={1} bg="beige">
      <Stack
        flex={1}
        justifyContent="center"
        alignItems="center"
        paddingHorizontal="$4"
        bg="beige"
      >
        <Heading>Verify</Heading>
        <Spacing size={6} />
        <Input
          width="100%"
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
        <Spacing size={6} />
        <Form.Trigger asChild>
          <Button
            icon={isLoading ? <Spinner /> : null}
            width="100%"
            bg="$purple7"
          >
            Login
          </Button>
        </Form.Trigger>
      </Stack>
    </Form>
  );
}
