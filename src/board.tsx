import React from "react";
import * as CONSTANTS from "./constants.ts";
import * as TYPES from "../types.ts";

export default function Board({
  placeRobot,
}: {
  placeRobot: (position: TYPES.RobotPosition) => void;
}): React.ReactElement {
  const tiles = [];
  for (let row = CONSTANTS.GridSize - 1; row >= 0; row -= 1) {
    for (let col = 0; col < CONSTANTS.GridSize; col += 1) {
      const tileNumber = row + col * CONSTANTS.GridSize;
      tiles.push(
        <div
          key={`robot-board-box-${tileNumber}`}
          className={tileNumber % 2 === 0 ? "bg-green-600" : "bg-green-400"}
          onClick={() => placeRobot({ x: row, y: col })}
        >
          {row} {col}
        </div>
      );
    }
  }
  return <React.Fragment>{tiles}</React.Fragment>;
}
