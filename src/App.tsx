import React from "react";
import "./index.css";
import Board from "./board";
import { GRIDSIZE } from "./constants";

function App() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div
        className="h-[400px] w-[400px] relative grid"
        style={{
          gridTemplateRows: `repeat(${GRIDSIZE}, 1fr)`,
          gridTemplateColumns: `repeat(${GRIDSIZE}, 1fr)`,
          height: `${document.getElementById("snake-game")?.offsetWidth}px`,
        }}
      >
        <Board />
      </div>
    </div>
  );
}

export default App;
