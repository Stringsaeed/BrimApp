import { useFormik } from "formik";
import React, { useReducer } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import Banner from "components/banner";
import Button from "components/button";
import Input from "components/input";
import Spacing from "components/spacing";
import { useAuth } from "contexts";
import { Auth } from "services";

const emailFieldSchema = z.string().email();
const formSchema = z.object({
  email: emailFieldSchema,
});
const validationSchema = toFormikValidationSchema(formSchema);

export default function AddEmailBanner() {
  const { user } = useAuth();
  const [isVisible, toggle] = useReducer((s) => !s, !user?.email);

  const { handleSubmit, handleChange, handleBlur, isValid, values, dirty } =
    useFormik({
      onSubmit: (values) => Auth.updateEmail(values.email),
      initialValues: { email: "" },
      validationSchema,
    });

  const buttonDisabled = !isValid || !dirty;

  return (
    <Banner
      isVisible={isVisible}
      color="background"
      label="Link your email"
      onClose={toggle}
    >
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
      />
      <Spacing size={2} />
      <Button disabled={buttonDisabled} onPress={handleSubmit}>
        <Button.Label>Submit</Button.Label>
      </Button>
    </Banner>
  );
}
