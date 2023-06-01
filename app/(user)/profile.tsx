import React from "react";
import { Stack, Button } from "tamagui";

import { useSignOutMutation } from "hooks";

export default function Profile() {
  const signOutMutation = useSignOutMutation();

  return (
    <Stack bg="beige" flex={1} justifyContent="center" paddingHorizontal="$4">
      <Button bg="$purple5" onPress={() => signOutMutation.mutate()}>
        Sign out
      </Button>
    </Stack>
  );
}
