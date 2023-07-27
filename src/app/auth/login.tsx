import React from "react";
import { View, ViewStyle } from "react-native";

import {
  Button,
  Input,
  LargeTitle,
  Spacer,
  Row,
  CountryBottomSheet,
} from "components";
import { useLoginMutation } from "hooks";

export default function LoginPage() {
  const {
    handleOnRegionChange,
    isSubmitDisabled,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
  } = useLoginMutation();

  return (
    <>
      <LargeTitle emphasized>What&apos;s your phone number</LargeTitle>
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
    </>
  );
}

const inputContainer: ViewStyle = {
  flex: 1,
};
