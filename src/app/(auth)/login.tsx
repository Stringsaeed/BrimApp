import React from "react";

import { useLoginForm } from "hooks";
import { LoginView } from "screens";

export default function LoginPage() {
  const { isSubmitDisabled, onSubmit, control } = useLoginForm();

  return (
    <LoginView
      isSubmitDisabled={isSubmitDisabled}
      onSubmit={onSubmit}
      control={control}
    />
  );
}
