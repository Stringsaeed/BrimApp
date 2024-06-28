import { useHeaderHeight } from "@react-navigation/elements";
import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Heading,
  Button,
  Input,
  Paragraph,
  Form,
  YStack,
  Spinner,
} from "tamagui";

import { useLoginForm, useUserAccent } from "hooks";

export default function LoginScreen() {
  const { t } = useTranslation("auth");
  const { isSubmitDisabled, isSubmitting, onSubmit, control } = useLoginForm();
  const { accent } = useUserAccent();
  const headerHeight = useHeaderHeight();

  return (
    <Form f={1} px="$4" gap="$4" pt={headerHeight} onSubmit={onSubmit}>
      <YStack>
        <Heading>{t("login.title")}</Heading>
        <Paragraph>{t("login.description")}</Paragraph>
      </YStack>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            size="$5"
            borderRadius="$12"
            textContentType="emailAddress"
            autoComplete="email"
            keyboardType="email-address"
            placeholder={t("login.emailPlaceholder")}
            autoCapitalize="none"
            inputMode="email"
            autoCorrect={false}
            value={value}
            textAlignVertical="center"
            onChangeText={onChange}
            onBlur={onBlur}
            selectionColor={`$${accent}`}
          />
        )}
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
          icon={isSubmitting ? <Spinner /> : undefined}
        >
          {t("login.submitButton")}
        </Button>
      </Form.Trigger>
    </Form>
  );
}
