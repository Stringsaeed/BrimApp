import React from "react";
import { Stack } from "tamagui";

import { Button } from "components";
import { useSignOutMutation } from "hooks";

export default function Profile() {
  const signOutMutation = useSignOutMutation();

  return (
    <>
      <Stack flex={1} justifyContent="center" paddingHorizontal="$4">
        <Button label="Sign out" onPress={() => signOutMutation.mutate()} />
      </Stack>
    </>
  );
}
