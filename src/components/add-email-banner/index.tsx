import { X } from "@tamagui/lucide-icons";
import { useFormik } from "formik";
import React, { useReducer } from "react";
import { Input, Button, Card, XStack, Label, Circle } from "tamagui";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { useAuth } from "contexts";
import { Auth } from "services";

const emailFieldSchema = z.string().email();
const formSchema = z.object({
  email: emailFieldSchema,
});
const validationSchema = toFormikValidationSchema(formSchema);

export default function AddEmailBanner() {
  const { user } = useAuth();
  const [isVisible, toggle] = useReducer((s) => !s, !!user?.email);

  const { handleSubmit, handleChange, handleBlur, isValid, values, dirty } =
    useFormik({
      onSubmit: (values) => Auth.updateEmail(values.email),
      initialValues: { email: "" },
      validationSchema,
    });

  const buttonDisabled = !isValid || !dirty;

  if (!isVisible) return null;

  return (
    <Card padded elevate space animation="lazy" enterStyle={{ opacity: 0 }}>
      <Card.Header size="$1">
        <XStack justifyContent="space-between" alignItems="center">
          <Label>Link your email</Label>
          <Circle p="$1.5" bg="$accent" onPress={toggle}>
            <X size="$1" color="$background" />
          </Circle>
        </XStack>
      </Card.Header>
      <Input
        placeholder="Email Address"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoComplete="email"
        autoCapitalize="none"
        autoCorrect={false}
        value={values.email}
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        size="$4"
      />
      <Card.Footer>
        <Button
          width="100%"
          size="$3"
          bg="$accent"
          disabled={buttonDisabled}
          // @ts-expect-error
          onPress={handleSubmit}
        >
          <Button.Text color="$background">Submit</Button.Text>
        </Button>
      </Card.Footer>
    </Card>
  );
}
