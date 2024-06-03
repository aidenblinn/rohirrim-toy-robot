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

  // Alert user with location and direction of robot
  const reportRobotStatus = () => {
    alert(
      `x position: ${robotPosition.x}. y position: ${robotPosition.y}. direction: ${direction}.`
    );
  };

  const robotOnTabletop = robotPosition.x !== null;

  // Define default styles for movement buttons to avoid code duplication
  const buttonStyling =
    "hover:brightness-125 text-white py-2 px-4 rounded disabled:bg-gray-300 disabled:hover:brightness-100";

  return (
    <div className="flex h-screen w-screen gap-8 justify-center items-center bg-blue-100">
      {/* Grid to hold tabletop and robot */}
      <div
        className="relative grid"
        style={{
          gridTemplateRows: `repeat(${CONSTANTS.GridSize}, 1fr)`,
          gridTemplateColumns: `repeat(${CONSTANTS.GridSize}, 1fr)`,
          height: `${CONSTANTS.TabletopHeight}px`,
          width: `${CONSTANTS.TabletopHeight}px`,
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
      <div className="flex flex-col gap-4">
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
        {/* Report button to alert user with direction / position of robot */}
        <button
          className={buttonStyling + " bg-yellow-500"}
          disabled={!robotOnTabletop}
          onClick={reportRobotStatus}
        >
          Report
        </button>
        {/* Display persistent direction / position report using state */}
        <div className="flex flex-col items-center justify-center border border-blue-500 text-blue-500 rounded bg-white">
          <p>x: {robotPosition.x === null ? "none" : robotPosition.x}</p>
          <p>y: {robotPosition.y === null ? "none" : robotPosition.y}</p>
          <p>direction: {robotOnTabletop ? direction : "none"}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
