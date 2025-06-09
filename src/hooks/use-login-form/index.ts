import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import supabaseClient from "@/services/supabase";

const loginSchema = z.object({
  email: z.string().email().min(1),
});

type LoginSchema = z.infer<typeof loginSchema>;

const loginResolver = zodResolver(loginSchema);

function loginMutate(values: LoginSchema) {
  return supabaseClient.auth.signInWithOtp({
    email: values.email,
  });
}
export default function useLoginForm() {
  const router = useRouter();
  const signInWithPhoneNumberMutation = useMutation({
    onSuccess(_, variables) {
      router.push({
        params: {
          email: variables.email,
        },
        pathname: `/auth/verify`,
      });
    },
    mutationFn: loginMutate,
  });

  const onLogin = useCallback(
    ({ email }: LoginSchema) => {
      signInWithPhoneNumberMutation.mutate({ email });
    },
    [signInWithPhoneNumberMutation]
  );

  const {
    formState: { isSubmitting, isDirty, isValid },
    handleSubmit,
    control,
  } = useForm<LoginSchema>({
    defaultValues: {
      email: "",
    },
    resolver: loginResolver,
  });

  const isSubmitDisabled = !isDirty || !isValid;
  const onSubmit = handleSubmit(onLogin);

  return {
    isSubmitDisabled,
    isSubmitting,
    onSubmit,
    control,
  };
}
