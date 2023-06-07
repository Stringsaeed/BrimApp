import React from "react";
import { View } from "react-native";

import { useSignOutMutation } from "hooks";
import { Button } from "components";
import { theme } from "themes";

export default function Profile() {
  const signOutMutation = useSignOutMutation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        paddingHorizontal: 16,
      }}
    >
      <Button label="Sign out" onPress={() => signOutMutation.mutate()} />
    </View>
  );
}
