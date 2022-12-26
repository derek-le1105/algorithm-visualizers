import { useState, useEffect } from "react";
import TileSetting from "./Components/TileSetting";
import TreeVisualization from "./Components/TreeVisualization";
import NavBar from "../NavBar/NavBar";

import Node from "./HelperFiles/Node";
import "./EightTile.css";

const EightTile = () => {
  const [tutorialClicked, setTutorialClicked] = useState(false);
  const [treeData, setTreeData] = useState(
    new Node([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 0],
    ])
  );
  const [goalData, setGoalData] = useState([]);

  const [showReplay, setShowReplay] = useState(false);

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
      <TileSetting
        setTreeData={setTreeData}
        setGoalData={setGoalData}
        showReplay={showReplay}
      ></TileSetting>

      <TreeVisualization
        treeData={treeData}
        goalData={goalData}
        setShowReplay={setShowReplay}
      ></TreeVisualization>
    </>
  );
};

export default EightTile;
