/* eslint-disable @typescript-eslint/no-require-imports */
import { screen } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import render from "utils/test";

import AuthLayout from "../";

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

describe("AuthLayout", () => {
  it("should render correctly", () => {
    render(
      <AuthLayout>
        <Text>Test</Text>
      </AuthLayout>
    );

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render children", () => {
    render(
      <AuthLayout>
        <Text>Test</Text>
      </AuthLayout>
    );

    expect(screen.getByText("Test")).toBeTruthy();
  });
});
