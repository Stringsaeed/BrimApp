import { useMutation } from "@tanstack/react-query";
import auth from "@react-native-firebase/auth";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

interface VerifyPhoneNumberInput {
  verificationId: string;
  code: string;
}

async function verifyPhoneNumber(input: VerifyPhoneNumberInput) {
  const credential = auth.PhoneAuthProvider.credential(
    input.verificationId,
    input.code
  );

  await auth().signInWithCredential(credential);
  return true;
}

export default function useVerifyPhoneNumberMutation() {
  const [code, setCode] = useState("");
  const { verificationId } = useLocalSearchParams();

  const verifyPhoneNumberMutation = useMutation(verifyPhoneNumber);

  const handleVerify = useCallback(() => {
    verifyPhoneNumberMutation.mutate({
      verificationId: verificationId as string,
      code,
    });
  }, [code, verificationId, verifyPhoneNumberMutation]);

  return {
    handleVerify,
    setCode,
    code,
    ...verifyPhoneNumberMutation,
  };
}
