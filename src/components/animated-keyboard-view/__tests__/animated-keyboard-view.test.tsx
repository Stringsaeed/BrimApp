/* eslint-disable @typescript-eslint/no-require-imports */
import { screen } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";

import render from "utils/test";

import AnimatedKeyboardView from "../";

jest.mock("react-native-reanimated", () => {
  const mockedReanimated = require("react-native-reanimated/mock");
  return {
    __esModule: true,
    ...mockedReanimated,
    useAnimatedKeyboard: jest.fn(() => {
      return {
        height: {
          value: 0,
        },
      };
    }),
  };
});

describe("AnimatedKeyboardView", () => {
  it("should render correctly", () => {
    render(
      <AnimatedKeyboardView>
        <Text>Test</Text>
      </AnimatedKeyboardView>
    );

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render children", () => {
    render(
      <AnimatedKeyboardView>
        <Text>Test</Text>
      </AnimatedKeyboardView>
    );

    expect(screen.getByText("Test")).toBeTruthy();
  });

  it("should render with default styles", () => {
    render(
      <AnimatedKeyboardView>
        <Text>Test</Text>
      </AnimatedKeyboardView>
    );

    expect(screen.getByTestId("animated-keyboard-view")).toHaveStyle({
      backgroundColor: "rgba(255,255,255,0)",
      flexDirection: "column",
      paddingBottom: 16,
      paddingRight: 16,
      paddingLeft: 16,
      paddingTop: 24,
      flex: 1,
      gap: 24,
    });
  });

  it("should not handle safe area view", () => {
    render(
      <SafeAreaInsetsContext.Provider
        value={{ bottom: 0, right: 0, top: 24, left: 0 }}
      >
        <AnimatedKeyboardView handleTopSafeArea={false}>
          <Text>Test</Text>
        </AnimatedKeyboardView>
      </SafeAreaInsetsContext.Provider>
    );

    expect(screen.getByTestId("animated-keyboard-view")).not.toHaveStyle({
      paddingTop: 48,
    });
  });

  it("should handle safe area view", () => {
    render(
      <SafeAreaInsetsContext.Provider
        value={{ bottom: 0, right: 0, top: 24, left: 0 }}
      >
        <AnimatedKeyboardView handleTopSafeArea>
          <Text>Test</Text>
        </AnimatedKeyboardView>
      </SafeAreaInsetsContext.Provider>
    );

    expect(screen.getByTestId("animated-keyboard-view")).toHaveStyle({
      paddingTop: 48,
    });
  });

  it("should pad bottom with keyboard height", () => {
    jest
      .spyOn(require("react-native-reanimated"), "useAnimatedKeyboard")
      .mockReturnValue({
        height: {
          value: 200,
        },
      });

    render(
      <AnimatedKeyboardView>
        <Text>Test</Text>
      </AnimatedKeyboardView>
    );

    expect(screen.getByTestId("animated-keyboard-view")).toHaveStyle({
      paddingBottom: 200,
    });
  });
});
