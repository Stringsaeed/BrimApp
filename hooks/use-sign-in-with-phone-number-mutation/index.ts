import { useMutation } from "@tanstack/react-query";
import auth from "@react-native-firebase/auth";
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
      router.push({ pathname: "auth/verify", params: { verificationId } });
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleSubmit = useCallback(() => {
    signInWithPhoneNumberMutation.mutate(phoneNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNumber]);

  return {
    phoneNumber,
    setPhoneNumber,
    handleSubmit,
    ...signInWithPhoneNumberMutation,
  };
}
