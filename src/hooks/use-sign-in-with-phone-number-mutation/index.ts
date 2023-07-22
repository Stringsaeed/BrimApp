import auth from "@react-native-firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

async function signInWithPhoneNumber(phoneNumber: string) {
  if (__DEV__) auth().settings.appVerificationDisabledForTesting = true;

  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
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
      router.push({ params: { verificationId }, pathname: "auth/verify" });
    },
    onError() {},
  });

  const handleSubmit = useCallback(() => {
    console.log(phoneNumber);

    signInWithPhoneNumberMutation.mutate(phoneNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNumber]);

  return {
    setPhoneNumber,
    handleSubmit,
    phoneNumber,
    ...signInWithPhoneNumberMutation,
  };
}