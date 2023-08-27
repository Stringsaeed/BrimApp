import React from "react";

import { useVerifyPhoneNumberMutation } from "hooks";
import { VerifyView } from "screens";

export default function VerifyPage() {
  const { handleVerify, setCode, code } = useVerifyPhoneNumberMutation();
  return (
    <VerifyView
      code={code}
      onCodeChangeText={setCode}
      onSubmit={handleVerify}
    />
  );
}
