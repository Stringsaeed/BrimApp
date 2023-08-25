import { View } from "moti";
import React from "react";
import { ViewStyle } from "react-native";
import { Heading, Text, Input, Button } from "tamagui";

import {
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
      <Heading>
        Welcome to <Text fontWeight="$5">Brim</Text>
      </Heading>
      <Row gap={8}>
        <CountryBottomSheet
          region={values.country}
          onRegionChange={handleOnRegionChange}
        />
        <View style={inputContainer}>
          <Input
            size="$5"
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
        bg="$pink6"
        size="$5"
        // animation="lazy"
        opacity={isSubmitDisabled ? 0.5 : 1}
        // animateOnly={["opacity"]}
        disabled={isSubmitDisabled}
        onPress={() => handleSubmit()}
      >
        <Button.Text>Continue</Button.Text>
      </Button>
      <View nativeID="sign-in-button" />
    </AnimatedKeyboardView>
  );
}

const inputContainer: ViewStyle = {
  flex: 1,
};
