import { LinearGradient } from "@tamagui/linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";
import {
  View,
  Button,
  Heading,
  Input,
  Spacer,
  Text,
  XStack,
  Card,
} from "tamagui";

import { BlurView, CountryBottomSheet } from "components";
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
    <View
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      flex={1}
    >
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={["$background", "$background", "$pink6"]}
      />
      <Card pos="absolute" alignSelf="center" maxWidth={400} maxHeight={600}>
        <Card.Background>
          <BlurView
            intensity={10}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
        </Card.Background>
        <Card.Header>
          <Heading>
            Welcome to <Text fontWeight="$5">Brim</Text>
          </Heading>
        </Card.Header>
        <XStack gap={8} px="$3.5">
          <CountryBottomSheet
            region={values.country}
            onRegionChange={handleOnRegionChange}
          />
          <View flex={1}>
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
        </XStack>
        <Spacer />
        <Card.Footer>
          <View maxWidth={400} px="$3.5" flex={1}>
            <Button
              bg="$pink6"
              size="$5"
              width="100%"
              // animation="lazy"
              opacity={isSubmitDisabled ? 0.5 : 1}
              // animateOnly={["opacity"]}
              disabled={isSubmitDisabled}
              onPress={() => handleSubmit()}
            >
              <Button.Text>Continue</Button.Text>
            </Button>
          </View>
        </Card.Footer>
        <View nativeID="sign-in-button" />
      </Card>
    </View>
  );
}
