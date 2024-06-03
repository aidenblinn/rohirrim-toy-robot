import { useState } from "react";
import "./index.css";
import Tabletop from "./tabletop.tsx";
import * as TYPES from "../types.ts";
import * as CONSTANTS from "./constants.ts";

const getRobotRotation = (direction: TYPES.RobotDirection) => {
  switch (direction) {
    case "north":
      return "0";
    case "east":
      return "90";
    case "south":
      return "180";
    case "west":
      return "270";
  }
};

function App() {
  const [direction, setDirection] = useState<TYPES.RobotDirection>("north");
  const [robotPosition, setRobotPosition] = useState<TYPES.RobotPosition>({
    x: null,
    y: null,
  });

  // Place robot when tabletop grid tile clicked
  const placeRobot = (position: TYPES.RobotPosition) => {
    setRobotPosition(position);
    setDirection("north");
  };

  const rotateLeft = () => {
    switch (direction) {
      case "north":
        return setDirection("west");
      case "east":
        return setDirection("north");
      case "south":
        return setDirection("east");
      case "west":
        return setDirection("south");
    }
  };

  const rotateRight = () => {
    switch (direction) {
      case "north":
        return setDirection("east");
      case "east":
        return setDirection("south");
      case "south":
        return setDirection("west");
      case "west":
        return setDirection("north");
    }
  };

  // Move robot in response to user clicking on "MOVE" button
  const moveRobot = () => {
    if (robotPosition.x === null) {
      return;
    }

    // Move robot in direction that robot is facing
    // If new location would be out of bounds, do not move robot
    switch (direction) {
      case "north":
        if (robotPosition.x < CONSTANTS.GridSize - 1) {
          return setRobotPosition({
            x: robotPosition.x + 1,
            y: robotPosition.y,
          });
        }
        break;
      case "east":
        if (robotPosition.y < CONSTANTS.GridSize - 1) {
          return setRobotPosition({
            x: robotPosition.x,
            y: robotPosition.y + 1,
          });
        }
        break;
      case "south":
        if (robotPosition.x > 0) {
          return setRobotPosition({
            x: robotPosition.x - 1,
            y: robotPosition.y,
          });
        }
        break;
      case "west":
        if (robotPosition.y > 0) {
          return setRobotPosition({
            x: robotPosition.x,
            y: robotPosition.y - 1,
          });
        }
        break;
    }
  };

  const robotOnTabletop = robotPosition.x !== null;

  // Define default styles for movement buttons to avoid code duplication
  const buttonStyling =
    "hover:brightness-125 text-white py-2 px-4 rounded disabled:bg-gray-300 disabled:hover:brightness-100";

  return (
    <div className="flex flex-col h-screen w-screen gap-8 justify-center items-center">
      {/* Grid to hold tabletop and robot */}
      <div
        className="h-[400px] w-[400px] relative grid"
        style={{
          gridTemplateRows: `repeat(${CONSTANTS.GridSize}, 1fr)`,
          gridTemplateColumns: `repeat(${CONSTANTS.GridSize}, 1fr)`,
          height: `${document.getElementById("snake-game")?.offsetWidth}px`,
        }}
      >
        {/* Tabletop tiles */}
        <Tabletop placeRobot={placeRobot} />
        {/* Render robot with position and rotation dependent on robot's current position and direction */}
        {robotOnTabletop && (
          <img
            className="absolute p-4"
            style={{
              "width": `${CONSTANTS.BoxSize}px`,
              top: `${
                (CONSTANTS.GridSize - robotPosition.x - 1) * CONSTANTS.BoxSize
              }px`,
              left: `${robotPosition.y * CONSTANTS.BoxSize}px`,
              transform: `rotate(${getRobotRotation(direction)}deg)`,
            }}
            src="robot.png"
            alt="Robot"
          />
        )}
      </div>
      {/* Direction and movement buttons */}
      <div className="flex space-x-2">
        <button
          className={buttonStyling + " bg-blue-500"}
          disabled={!robotOnTabletop}
          onClick={rotateLeft}
        >
          Left
        </button>
        <button
          className={buttonStyling + " bg-red-500"}
          disabled={!robotOnTabletop}
          onClick={moveRobot}
        >
          MOVE
        </button>
        <button
          className={buttonStyling + " bg-blue-500"}
          disabled={!robotOnTabletop}
          onClick={rotateRight}
        >
          Right
        </button>
      </div>
    </div>
  );
}

export default App;
