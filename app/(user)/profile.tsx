import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import React from "react";
import { Button, Input, ScreenContainer, Spacing } from "components";
import { useSignOutMutation } from "hooks";
import { useAuth } from "contexts";
import { theme } from "themes";

export default function Profile() {
  const { user } = useAuth();
  const signOutMutation = useSignOutMutation();

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.background, flex: 1 }}
      edges={["bottom"]}
      mode="padding"
    >
      <ScreenContainer
        contentContainerStyle={{ paddingTop: 24 }}
        handleKeyboard
        type="scroll"
        centered
      >
        <Input value={user?.email ?? ""} placeholder="Email" />
        <Spacing />
        <Input value={user?.phoneNumber ?? ""} placeholder="Phone Number" />
        <Spacing />
        <Input value={user?.displayName ?? ""} placeholder="Display Name" />
        <Spacing />
        <View style={{ flex: 1 }} />
        <Button
          onPress={() => signOutMutation.mutate()}
          variant="warning"
          label="Sign out"
        />
      </ScreenContainer>
    </SafeAreaView>
  );
}
