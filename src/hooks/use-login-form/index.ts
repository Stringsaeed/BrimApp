import { useCallback } from "react";
import { useForm } from "react-hook-form";

import useGetInitialLocale from "hooks/use-get-initial-locale";
import useSignInWithPhoneNumberMutation from "hooks/use-sign-in-with-phone-number-mutation";
import { getPhoneNumber } from "utils";

import { loginResolver, LoginSchema } from "./validation";

export default function useLoginForm() {
  const initialCountryCodeValue = useGetInitialLocale();
  const signInWithPhoneNumberMutation = useSignInWithPhoneNumberMutation();

  const onLogin = useCallback(
    ({ phoneNumber, country }: LoginSchema) => {
      const formattedPhoneNumber = getPhoneNumber(phoneNumber, country);
      signInWithPhoneNumberMutation.mutate(formattedPhoneNumber);
    },
    [signInWithPhoneNumberMutation]
  );

  const {
    formState: { isDirty, isValid },
    handleSubmit,
    control,
  } = useForm<LoginSchema>({
    defaultValues: {
      country: initialCountryCodeValue,
      phoneNumber: "",
    },
    resolver: loginResolver,
  });

  const isSubmitDisabled = !isDirty || !isValid;
  const onSubmit = handleSubmit(onLogin);

  return {
    isSubmitDisabled,
    onSubmit,
    control,
  };
}
