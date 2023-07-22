import auth from "@react-native-firebase/auth";
import { useMutation } from "@tanstack/react-query";

async function signOut() {
  await auth().signOut();
}

export default function useSignOutMutation() {
  return useMutation(signOut);
}
