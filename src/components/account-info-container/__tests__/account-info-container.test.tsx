import { screen } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import AccountInfoContainer from "../";
import render from "../../../utils/test";

describe("AccountInfoContainer", () => {
  it("should render correctly", () => {
    render(
      <AccountInfoContainer>
        <Text>Test</Text>
      </AccountInfoContainer>
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render children", () => {
    render(
      <AccountInfoContainer>
        <Text>Test</Text>
      </AccountInfoContainer>
    );
    expect(screen.getByText("Test")).toBeTruthy();
  });

  it("should render with default styles", () => {
    render(
      <AccountInfoContainer>
        <Text>Test</Text>
      </AccountInfoContainer>
    );

    expect(screen.getByTestId("account-info-container")).toHaveStyle({
      paddingRight: 18,
      paddingLeft: 18,
      paddingTop: 24,
      flex: 1,
      gap: 24,
    });
  });
});
