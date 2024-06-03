import { useState } from "react";
import "./index.css";
import Board from "./board";
import * as TYPES from "../types.ts";
import * as CONSTANTS from "./constants.ts";

function App() {
  const [direction, setDirection] = useState<TYPES.RobotDirection>("north");
  const [robotPosition, setRobotPosition] = useState<TYPES.RobotPosition>({
    x: null,
    y: null,
  });

  const placeRobot = (position: TYPES.RobotPosition) => {
    setRobotPosition(position);
    setDirection("north");
  };

  return (
    <div className="flex flex-col h-screen w-screen gap-8 justify-center items-center">
      <div
        className="h-[400px] w-[400px] relative grid"
        style={{
          gridTemplateRows: `repeat(${CONSTANTS.GridSize}, 1fr)`,
          gridTemplateColumns: `repeat(${CONSTANTS.GridSize}, 1fr)`,
          height: `${document.getElementById("snake-game")?.offsetWidth}px`,
        }}
      >
        <Board placeRobot={placeRobot} />
        {robotPosition.x !== null && (
          <img
            className="absolute"
            style={{
              "width": `${CONSTANTS.BoxSize}px`,
              top: `${
                (CONSTANTS.GridSize - robotPosition.x - 1) * CONSTANTS.BoxSize
              }px`,
              left: `${robotPosition.y * CONSTANTS.BoxSize}px`,
            }}
            src="arrow.png"
            alt="Arrow representing robot"
          />
        )}
      </div>
      <div className="flex space-x-2">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Left
        </button>
        <button className="bg-red-500 text-white py-2 px-4 rounded">
          MOVE
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Right
        </button>
      </div>
    </div>
  );
}

export default App;
