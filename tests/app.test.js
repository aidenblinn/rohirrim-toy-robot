import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/app";
import "@testing-library/jest-dom";
import * as CONSTANTS from "../src/constants";

describe("Robot movement in response to tabletop click", () => {
  beforeEach(() => {
    render(<App />);
    const bottomLeftCell = screen.getByTestId("robot-tabletop-box-0-0");
    fireEvent.click(bottomLeftCell);
  });

  test("Initial click places robot on the tabletop", () => {
    const robot = screen.getByTestId("robot");
    expect(robot).toBeInTheDocument();
  });

  test("Subsequent clicks move robot to clicked-on cell", () => {
    const robot = screen.getByTestId("robot");

    // Click on top left cell
    const topLeftCell = screen.getByTestId("robot-tabletop-box-4-0");
    fireEvent.click(topLeftCell);
    expect(robot.style.top).toEqual("0px");
    expect(robot.style.left).toEqual("0px");

    // Click on top right cell
    const topRightCell = screen.getByTestId("robot-tabletop-box-4-4");
    fireEvent.click(topRightCell);

    expect(robot.style.top).toEqual("0px");
    expect(robot.style.left).toEqual(
      `${CONSTANTS.BoxSize * (CONSTANTS.GridSize - 1)}px`
    );
  });
});

describe("Robot movement in response to move button click", () => {
  beforeEach(() => {
    render(<App />);
    const gridCell = screen.getByTestId("robot-tabletop-box-0-0");
    fireEvent.click(gridCell);
  });
  test("Robot moves one tabletop square when move button clicked", () => {
    // Get initial "top" property (proxy for robot's location on grid)
    const robot = screen.getByTestId("robot");
    const initialTop = parseInt(robot.style.top);

    // Move up (direction defaults to north)
    const moveButton = screen.getByText("MOVE");
    fireEvent.click(moveButton);

    // Robot should have moved up one box
    const newTop = parseInt(robot.style.top);
    expect(newTop).toBe(initialTop - CONSTANTS.BoxSize);
  });
});

describe("Robot direction", () => {
  beforeEach(() => {
    render(<App />);
    const gridCell = screen.getByTestId("robot-tabletop-box-0-0");
    fireEvent.click(gridCell);
  });
  test("Robot moves direction when direction button clicked", () => {
    // Rotate from north to east
    const rightButton = screen.getByText("Right");
    fireEvent.click(rightButton);

    const directionElement = screen.getByText("direction: east");
    expect(directionElement).toBeInTheDocument();
  });
});
