import React from "react";
import { render, screen } from "@testing-library/react-native";

import Title from "..";

describe("Title", () => {
  it("should render correctly", () => {
    render(<Title>Test</Title>);

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
