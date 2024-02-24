import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Heading, Text, Button, View, Input } from "tamagui";

import { Spacer, AuthLayout } from "components";
import { useLoginForm, useUserAccent } from "hooks";

export default function LoginScreen() {
  const { t } = useTranslation("auth");
  const { isSubmitDisabled, onSubmit, control } = useLoginForm();
  const { accent } = useUserAccent();

  return (
    <AuthLayout>
      <Heading>
        Welcome to <Text fontWeight="$5">Brim</Text>
      </Heading>

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
          />
        )}
      />
      <Spacer />
      <Button
        width="100%"
        bg={`$${accent}`}
        size="$5"
        color="$background"
        borderRadius="$12"
        opacity={isSubmitDisabled ? 0.5 : 1}
        disabled={isSubmitDisabled}
        onPress={onSubmit}
      >
        {t("login.submitButton")}
      </Button>
      <View />
    </AuthLayout>
  );
}
