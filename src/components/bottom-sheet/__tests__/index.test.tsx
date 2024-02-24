import { screen } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import render from "utils/test";

import BottomSheet from "../index";

describe("BlurView", () => {
  it("should render correctly", () => {
    render(
      <BottomSheet>
        <Text>Test</Text>
      </BottomSheet>
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should renders backdrop", () => {
    render(
      <BottomSheet>
        <Text>Test</Text>
      </BottomSheet>
    );

    expect(screen.getByTestId("blur-backdrop")).toBeTruthy();
  });
});
