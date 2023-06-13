import React from "react";

import { useAuth } from "contexts";
import { useSignOutMutation } from "hooks";
import { Button, Input, ScreenContainer, Spacer, Spacing } from "components";

export default function Profile() {
  const { user } = useAuth();
  const signOutMutation = useSignOutMutation();

  return (
    <ScreenContainer
      handleSafeArea={"bottom"}
      handleKeyboard
      type="scroll"
      centered
    >
      <Spacing />
      <Input value={user?.email ?? ""} placeholder="Email" />
      <Spacing />
      <Input value={user?.phoneNumber ?? ""} placeholder="Phone Number" />
      <Spacing />
      <Input value={user?.displayName ?? ""} placeholder="Display Name" />
      <Spacer />
      <Button
        onPress={() => signOutMutation.mutate()}
        variant="warning"
        label="Sign out"
      />
    </ScreenContainer>
  );
}
