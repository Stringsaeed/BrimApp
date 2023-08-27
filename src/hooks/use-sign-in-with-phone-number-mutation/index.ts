import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";

import { Auth } from "services";

export async function signInWithPhoneNumber(phoneNumber: string) {
  try {
    const confirmation = await Auth.sendPhoneOTP(phoneNumber);
    return confirmation;
  } catch (error) {
    throw new Error("Invalid phone number");
  }
}

export default function useSignInWithPhoneNumberMutation() {
  const router = useNavigation();
  return useMutation(signInWithPhoneNumber, {
    onSuccess({ verificationId }) {
      if (!verificationId) throw new Error("Invalid verificationId");
      router.navigate("verify", { verificationId });
    },
    onError() {},
  });
}
