import { useMutation } from "@tanstack/react-query";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

async function signInWithPhoneNumber(phoneNumber: string) {
  const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  return confirmation;
}

export default function useSignInWithPhoneNumberMutation() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const signInWithPhoneNumberMutation = useMutation(signInWithPhoneNumber, {
    onSuccess({ verificationId }) {
      router.push({ pathname: "verify", params: { verificationId } });
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
