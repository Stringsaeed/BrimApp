import { useMutation } from "@tanstack/react-query";
import { getLocales } from "expo-localization";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useCallback, useMemo } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { Auth } from "services";
import { getPhoneNumber, withCountrySchema } from "utils";

// API
async function signInWithPhoneNumber(phoneNumber: string) {
  try {
    const confirmation = await Auth.sendPhoneOTP(phoneNumber);
    return confirmation;
  } catch (error) {
    console.log(error);

    throw new Error("Invalid phone number");
  }
}

// Validation Schema
const schema = withCountrySchema;
type Schema = z.infer<typeof schema>;

const validationSchema = toFormikValidationSchema(schema);

export default function useSignInWithPhoneNumberMutation() {
  const router = useRouter();
  const signInWithPhoneNumberMutation = useMutation(signInWithPhoneNumber, {
    onSuccess({ verificationId }) {
      if (!verificationId) throw new Error("Invalid verificationId");
      router.push({
        params: { verificationId },
        pathname: "/auth/verify",
      });
    },
    onError() {},
  });
  const initialCountryCodeValue = useMemo(() => {
    const locals = getLocales();
    if (!locals.length) return "US";
    const lastLocal = locals[locals.length - 1];
    const { regionCode } = lastLocal;
    if (!regionCode) return "US";
    return regionCode;
  }, []);

  const {
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    isValid,
    values,
    dirty,
  } = useFormik<Schema>({
    onSubmit: (values) => {
      signInWithPhoneNumberMutation.mutate(
        getPhoneNumber(values.phoneNumber, values.country)
      );
    },
    initialValues: {
      country: initialCountryCodeValue,
      phoneNumber: "",
    },
    validationSchema,
  });

  const isSubmitDisabled = !dirty || !isValid;

  const handleOnRegionChange = useCallback(
    (country: string) => {
      setFieldValue("country", country);
    },
    [setFieldValue]
  );

  return {
    handleOnRegionChange,
    isSubmitDisabled,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    ...signInWithPhoneNumberMutation,
  };
}
