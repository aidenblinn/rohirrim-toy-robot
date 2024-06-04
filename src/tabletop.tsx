import React from "react";
import * as CONSTANTS from "./constants.ts";
import * as TYPES from "../types.ts";

export default function Tabletop({
  placeRobot,
}: {
  placeRobot: (position: TYPES.RobotPosition) => void;
}): React.ReactElement {
  const tiles = [];
  // Iterate over rows and columns of tabletop
  for (let row = CONSTANTS.GridSize - 1; row >= 0; row -= 1) {
    for (let col = 0; col < CONSTANTS.GridSize; col += 1) {
      const tileNumber = row + col * CONSTANTS.GridSize;
      tiles.push(
        // Add individual grid tile
        // Move robot to this tile when tile clicked
        <div
          key={`robot-tabletop-box-${row}-${col}`}
          data-testid={`robot-tabletop-box-${row}-${col}`}
          className={
            "hover:bg-blue-400" +
            (tileNumber % 2 === 0 ? " bg-green-600" : " bg-green-400")
          }
          onClick={() => placeRobot({ x: row, y: col })}
        />
      );
    }
  }
  return <React.Fragment>{tiles}</React.Fragment>;
}
