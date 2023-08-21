import { Text } from "dripsy";
import { View } from "moti";
import React from "react";
import { ViewStyle } from "react-native";

import {
  Button,
  Input,
  Spacer,
  CountryBottomSheet,
  Row,
  AnimatedKeyboardView,
} from "components";
import { useLoginMutation, useRecaptchaVerifier } from "hooks";

export default function LoginPage() {
  const {
    handleOnRegionChange,
    isSubmitDisabled,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
  } = useLoginMutation();

  useRecaptchaVerifier();

  return (
    <AnimatedKeyboardView offset={40}>
      <Text sx={{ fontSize: "$4" }}>
        Welcome to <Text sx={{ fontWeight: "700" }}>Brim</Text>
      </Text>

      <Row gap={8}>
        <CountryBottomSheet
          region={values.country}
          onRegionChange={handleOnRegionChange}
        />
        <View style={inputContainer}>
          <Input
            textAlign="center"
            textContentType="telephoneNumber"
            autoComplete="tel"
            keyboardType="phone-pad"
            placeholder="Phone Number"
            autoCapitalize="none"
            autoCorrect={false}
            value={values.phoneNumber}
            textAlignVertical="center"
            onChangeText={handleChange("phoneNumber")}
            onBlur={handleBlur("phoneNumber")}
            style={{
              fontVariant: ["tabular-nums"],
            }}
          />
        </View>
      </Row>

      <Spacer />

      <Button
        disabled={isSubmitDisabled}
        variantStyle="Filled"
        size="Large"
        onPress={handleSubmit}
      >
        <Button.Label>Continue</Button.Label>
      </Button>
      <View nativeID="sign-in-button" />
    </AnimatedKeyboardView>
  );
}

const inputContainer: ViewStyle = {
  flex: 1,
};
