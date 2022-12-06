import { useState } from "react";
import TileSetting from "./Components/TileSetting";
import NavBar from "../NavBar/NavBar";
import "./EightTile.css";

const EightTile = () => {
  const [tutorialClicked, setTutorialClicked] = useState(false);

  const handleTutorialClick = () => {
    setTutorialClicked(true);
  };

  return (
    <>
      {!tutorialClicked && (
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
      )}
      <NavBar location="eight-tile"></NavBar>
      <TileSetting></TileSetting>
    </>
  );
};

export default EightTile;
