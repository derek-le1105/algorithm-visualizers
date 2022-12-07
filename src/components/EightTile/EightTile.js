import { useState } from "react";
import TileSetting from "./Components/TileSetting";
import NavBar from "../NavBar/NavBar";
import "./EightTile.css";

const EightTile = () => {
  const [tutorialClicked, setTutorialClicked] = useState(false);
  const [board, setBoard] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);

  const handleTutorialClick = () => {
    setTutorialClicked(true);
  };

  return (
    <>
      {/* {!tutorialClicked && (
        <div
          className="introduction-container"
          style={{
            backdropFilter: "blur(1px)",
          }}
        >
          <div className="tutorial-element">
            <button onClick={handleTutorialClick}>Click me</button>
          </div>
        </div>
      )} */}
      <NavBar location="eight-tile"></NavBar>
      <TileSetting></TileSetting>
      <div className="display-container">
        <div className="tiles" id="main-board">
          {board.map((value, idx) => (
            <div className={`tile-${value}`} key={idx}>
              {value}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EightTile;
