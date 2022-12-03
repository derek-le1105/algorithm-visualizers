import { useState } from "react";
import SettingBar from "../HelperComponents/SettingBar";
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
            backdropFilter: "blur(2px)",
          }}
        >
          <div className="tutorial-element">
            <button onClick={handleTutorialClick}>Click me</button>
          </div>
        </div>
      )}
      <div className="tile-component">
        <NavBar location="eight-tile"></NavBar>
        <div className="tile-board">
          <table className="board">
            <tr>
              <th>1</th>
              <th>2</th>
              <th>3</th>
            </tr>
            <tr>
              <th>4</th>
              <th>5</th>
              <th>6</th>
            </tr>
            <tr>
              <th>7</th>
              <th>8</th>
              <th>9</th>
            </tr>
          </table>
        </div>
        <SettingBar></SettingBar>
      </div>
    </>
  );
};

export default EightTile;
