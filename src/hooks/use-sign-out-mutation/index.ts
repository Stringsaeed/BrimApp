import { useMutation } from "@tanstack/react-query";

import { Auth } from "services";

async function signOut() {
  await Auth.signOut();
}

export default function useSignOutMutation() {
  return useMutation(signOut);
}
