import { LinearGradient } from "@tamagui/linear-gradient";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet } from "react-native";
import { Card, Heading, View } from "tamagui";

import { AuthLayoutProps } from "./types";

export default function AuthLayout({ children, heading }: AuthLayoutProps) {
  return (
    <View
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      minHeight="100wh"
      flex={1}
    >
      <LinearGradient
        flex={1}
        style={StyleSheet.absoluteFill}
        colors={["$background", "$accent"]}
        start={[0, 0.5]}
        end={[1.25, 0.5]}
      />
      <Card
        // className="center"
        // pos="absolute"
        // alignSelf="center"
        maxWidth={400}
        maxHeight={600}
        size="$6"
        p="$10"
        mx="auto"
      >
        <Card.Background flex={1}>
          <BlurView intensity={8} tint="dark" style={StyleSheet.absoluteFill} />
        </Card.Background>
        <Card.Header>
          <Heading>{heading}</Heading>
        </Card.Header>
        {children}
      </Card>
    </View>
  );
}
