import { screen } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import render from "utils/test";

import AuthLayout from "../index.web";

describe("AuthLayout", () => {
  it("should render correctly", () => {
    render(
      <AuthLayout>
        <Text>Test</Text>
      </AuthLayout>
    );

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render all parts", () => {
    render(
      <AuthLayout heading="Login">
        <Text>Test</Text>
      </AuthLayout>
    );

    expect(screen.getByText("Test")).toBeTruthy();
    expect(screen.getByText("Login")).toBeTruthy();
  });
});
