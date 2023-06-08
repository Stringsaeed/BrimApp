import React from "react";
import { View, StyleSheet } from "react-native";

import { Spacing, Button, Input, Headline } from "components";
import { useLoginMutation } from "hooks";
import { theme } from "themes";

export default function LoginPage() {
  const { handleSubmit, phoneNumber, setPhoneNumber } = useLoginMutation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Headline>What&apos;s your phone number</Headline>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
