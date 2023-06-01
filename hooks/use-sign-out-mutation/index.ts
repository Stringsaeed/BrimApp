import { useMutation } from "@tanstack/react-query";
import auth from "@react-native-firebase/auth";

async function signOut() {
  await auth().signOut();
}

export default function useSignOutMutation() {
  return useMutation(signOut);
}
