import { useRoute } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import { RootStackScreenProps } from "routers";
import { Auth } from "services";

interface VerifyPhoneNumberInput {
  verificationId: string;
  code: string;
}

async function verifyPhoneNumber(input: VerifyPhoneNumberInput) {
  await Auth.verifyOTP(input.code, input.verificationId);
}

export default function useVerifyPhoneNumberMutation() {
  const [code, setCode] = useState("");
  const {
    params: { verificationId },
  } = useRoute<RootStackScreenProps<"verify">["route"]>();

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
