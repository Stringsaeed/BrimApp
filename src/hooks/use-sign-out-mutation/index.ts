import { useMutation } from "@tanstack/react-query";

import { Analytics, Auth } from "services";

async function signOut() {
  await Analytics.signOut();
  await Auth.signOut();
}

export default function useSignOutMutation() {
  return useMutation(signOut);
}
