import { screen } from "@testing-library/react-native";
import React from "react";

import render from "utils/test";

import BlurView from "../blur";

describe("BlurView", () => {
  it("should render correctly", () => {
    render(<BlurView />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
