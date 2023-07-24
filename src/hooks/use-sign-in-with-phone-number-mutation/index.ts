import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";

import { Auth } from "services";

async function signInWithPhoneNumber(phoneNumber: string) {
  try {
    const confirmation = await Auth.sendPhoneOTP(phoneNumber);
    return confirmation;
  } catch (error) {
    throw new Error("Invalid phone number");
  }
}

export default function useSignInWithPhoneNumberMutation() {
  const [phoneNumber, setPhoneNumber] = useState("");
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

  const handleSubmit = () => {
    signInWithPhoneNumberMutation.mutate(phoneNumber);
  };

  return {
    setPhoneNumber,
    handleSubmit,
    phoneNumber,
    ...signInWithPhoneNumberMutation,
  };
}
