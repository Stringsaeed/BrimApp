import React from "react";
import { View, Text } from "react-native";

import { Spacing, Button, Input } from "components";
import { useLoginMutation } from "hooks";
import { theme } from "themes";

export default function LoginPage() {
  const { handleSubmit, phoneNumber, setPhoneNumber } = useLoginMutation();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <Text>What&apos;s your phone number</Text>
        <Spacing size={6} />
        <Input
          textAlign="center"
          textContentType="telephoneNumber"
          autoComplete="tel"
          keyboardType="phone-pad"
          placeholder="Phone Number"
          autoCapitalize="none"
          autoCorrect={false}
          value={phoneNumber}
          textAlignVertical="center"
          onChangeText={setPhoneNumber}
        />
        <Spacing size={6} />

        <Button label="Continue" onPress={handleSubmit} />
      </View>
    </View>
  );
}
