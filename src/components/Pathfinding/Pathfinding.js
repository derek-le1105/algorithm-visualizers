import "./Pathfinding.css";
import SettingBar from "./PathfindingParameters/SettingBar/SettingBar.js";
import Node from "./Node";
import breadthFirstSearch from "./Algorithms/PathFinding/breadthFirstSearch";
import depthFirstSearch from "./Algorithms/PathFinding/depthFirstSearch";
import aStarSearch from "./Algorithms/PathFinding/aStarSearch";

import recursiveDivision from "./Algorithms/MazeGeneration/recursiveDivision";

import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";

// TODO: Fix bug with holding down mouse while on a wall, gives error cursor sometimes

let ROW = 21,
  COLUMN = 49,
  START_NODE = [Math.floor(ROW / 2), Math.floor(COLUMN / 4)],
  END_NODE = [Math.floor(ROW / 2), Math.floor((3 * COLUMN) / 4)];

let defaultBoard = [];

const Visualizer = () => {
  let algoList = [
    "Breadth First Search",
    "Depth First Search",
    "A Star Search",
  ];
  let mazeList = ["Recursive Division"];

  const generateGrid = () => {
    const tempGrid = [];
    for (let i = 0; i < ROW; i++) {
      const currRow = [];
      for (let j = 0; j < COLUMN; j++) {
        currRow.push(createNewNode(i, j));
      }
      tempGrid.push(currRow);
    }
    defaultBoard = tempGrid.concat();
    return tempGrid;
  };

  const createNewNode = (row, col) => {
    return {
      row,
      col,
      isWall: false,
      isVisited: false,
      isStartingNode: row === START_NODE[0] && col === START_NODE[1],
      isFinishingNode: row === END_NODE[0] && col === END_NODE[1],
      previousNode: null,
      isPath: false,
    };
  };

  const generateWall = (row, col) => {
    const newGrid = grid.concat();
    const currNode = newGrid[row][col];
    const nodeChanged = {
      ...currNode,
      isWall: !currNode.isWall,
    };

    newGrid[row][col] = nodeChanged;
    return newGrid;
  };

  const onMouseDown = (row, col) => {
    if (!isFinding) {
      const newGrid = generateWall(row, col);
      setGrid(newGrid);
      setGridMaze(JSON.parse(JSON.stringify(newGrid)));
      setMouseHeld(true);
    }
  };

  const onMouseUp = () => {
    console.log("false");
    if (!isFinding) setMouseHeld(false);
  };

  const onMouseEnter = (row, col) => {
    if (mouseHeld && !isFinding) {
      onMouseDown(row, col);
    }
  };

  const startPathFind = async () => {
    if (!isFinding && !isGeneratingMaze) {
      setIsFinding(true);
      switch (algorithm) {
        case "Algorithm":
          alert("Please select a sorting algorithm in the dropdown below");
          break;
        case "Breadth First Search":
          await breadthFirstSearch({ ROW, COLUMN, grid, setGrid, START_NODE });
          break;
        case "Depth First Search":
          await depthFirstSearch({ ROW, COLUMN, grid, setGrid, START_NODE });
          break;

        case "A Star Search":
          await aStarSearch({
            ROW,
            COLUMN,
            grid,
            setGrid,
            START_NODE,
            END_NODE,
          });
          break;
        default:
          break;
      }
      setIsFinding(false);
    }
  };

  const generateMaze = async () => {
    if (gridMaze.length !== 0) resetBoard();
    if (!isFinding && !isGeneratingMaze && gridMaze.length === 0) {
      setIsGeneratingMaze(true);
      switch (maze) {
        case "Recursive Division":
          await recursiveDivision({ ROW, COLUMN, grid, setGrid });
          break;
        default:
          break;
      }
      setIsGeneratingMaze(false);
      setGridMaze(JSON.parse(JSON.stringify(grid))); //deep copy grid array
    }
  };

  const resetBoard = () => {
    if (!isFinding && !isGeneratingMaze) {
      setGrid(defaultBoard.concat());
      setGridMaze([]);
    }
  };

  const resetPath = () => {
    if (!isFinding && !isGeneratingMaze) {
      setGrid(JSON.parse(JSON.stringify(gridMaze)));
    }
  };

  const [grid, setGrid] = useState(generateGrid());
  const [gridMaze, setGridMaze] = useState([]);
  const [isGeneratingMaze, setIsGeneratingMaze] = useState(false);
  const [mouseHeld, setMouseHeld] = useState(false);
  const [algorithm, setAlgorithm] = useState("Algorithm");
  const [maze, setMaze] = useState("Maze");
  const [isFinding, setIsFinding] = useState(false);
  return (
    <>
      <NavBar></NavBar>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                return (
                  <Node
                    key={nodeIdx}
                    row={node.row}
                    col={node.col}
                    isVisited={node.isVisited}
                    isFinish={node.isFinishingNode}
                    isStart={node.isStartingNode}
                    isWall={node.isWall}
                    isPath={node.isPath}
                    onMouseDown={(row, col) => {
                      onMouseDown(row, col);
                    }}
                    onMouseUp={() => {
                      onMouseUp();
                    }}
                    onMouseEnter={(row, col) => {
                      onMouseEnter(row, col);
                    }}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
      <SettingBar
        isFinding={isFinding}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        maze={maze}
        setMaze={setMaze}
        startPathFind={startPathFind}
        generateMaze={generateMaze}
        resetBoard={resetBoard}
        algoList={algoList}
        mazeList={mazeList}
        resetPath={resetPath}
      />
    </>
  );
};

export default Visualizer;
