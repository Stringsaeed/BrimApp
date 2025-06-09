import { useMutation } from "@tanstack/react-query";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Button, Form, Heading, Input, Paragraph, YStack } from "tamagui";

import { useUserAccent } from "@/hooks";
import { Sentry } from "@/services";
import supabaseClient from "@/services/supabase";

function verifyEmail({ email, token }: { email: string; token: string }) {
  return supabaseClient.auth.verifyOtp({
    type: "email",
    email,
    token,
  });
}

export default function VerifyScreen() {
  const [code, setCode] = useState("");
  const router = useRouter();
  const { accent } = useUserAccent();
  const { email } = useGlobalSearchParams();
  const { mutate } = useMutation({
    onSuccess(data) {
      if (data.data.session !== null) {
        router.dismissAll();
      } else {
        Sentry.captureException(data.error);
      }
    },
    mutationFn: verifyEmail,
  });
  const isSubmitDisabled = code.length < 6;

  const handleSubmit = () => {
    mutate({ email: email as string, token: code });
  };

  return (
    <Form f={1} px="$4" gap="$4" pt="$5" onSubmit={handleSubmit}>
      <YStack>
        <Heading>Verify</Heading>
        <Paragraph>
          Enter the code that has been sent to {email}&apos;s inbox
        </Paragraph>
      </YStack>

      <Input
        inputMode="numeric"
        placeholder="Verification code"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
        value={code}
        maxLength={6}
        onChangeText={setCode}
        size="$5"
        borderRadius="$12"
        selectionColor={`$${accent}`}
        borderWidth={1}
        borderColor={`$${accent}`}
        // cursorColor="$accent"
      />

      <Form.Trigger asChild>
        <Button
          width="100%"
          bg={`$${accent}`}
          size="$5"
          color="$background"
          borderRadius="$12"
          opacity={isSubmitDisabled ? 0.5 : 1}
          disabled={isSubmitDisabled}
        >
          Submit
        </Button>
      </Form.Trigger>
    </Form>
  );
}
