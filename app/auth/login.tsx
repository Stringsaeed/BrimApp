import React from "react";
import { Button, Heading, Input, Stack, Form, Spinner } from "tamagui";

import { Spacing } from "components";
import { useLoginMutation } from "hooks";

export default function LoginPage() {
  const { handleSubmit, phoneNumber, setPhoneNumber, isLoading } =
    useLoginMutation();

  return (
    <Form onSubmit={handleSubmit} flex={1} bg="beige">
      <Stack
        flex={1}
        justifyContent="center"
        alignItems="center"
        paddingHorizontal="$4"
        bg="beige"
      >
        <Heading>What&apos;s your phone number</Heading>
        <Spacing size={6} />
        <Input
          width="100%"
          textAlign="center"
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
        <Form.Trigger asChild>
          <Button
            icon={isLoading ? <Spinner /> : null}
            width="100%"
            bg="$purple7"
            onPress={handleSubmit}
          >
            Continue
          </Button>
        </Form.Trigger>
      </Stack>
    </Form>
  );
}
