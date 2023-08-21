import { RecaptchaVerifier } from "firebase/auth";
import { useEffect } from "react";

import { auth } from "config";

export default function useRecaptchaVerifier() {
  useEffect(() => {
    const _recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
      },
      auth
    );

    // @ts-ignore
    window.recaptchaVerifier = _recaptchaVerifier;
  }, []);
}
