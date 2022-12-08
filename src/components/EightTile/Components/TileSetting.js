import "./TileSetting.css";

import search from "../HelperFiles/search";
import ControlButtons from "./ControlButtons";

import { useState } from "react";

const inital = [1, 2, 3, 4, 5, 6, 7, 8, 0];
const goal = [1, 2, 3, 4, 5, 6, 7, 8, 0];

const TileSetting = () => {
  const [initialBoard, setInitialBoard] = useState(inital);
  const [goalBoard, setGoalBoard] = useState(goal);
  const [algorithm, setAlgorithm] = useState("A* Search");
  const [heuristic, setHeuristic] = useState("Uniform Cost Search");
  const [isSearching, setIsSearching] = useState(false);

  const getInversionCount = (arr) => {
    let inv_count = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        // Value 0 is used for empty space
        if (arr[j] > arr[i]) inv_count++;
      }
    }
    return inv_count % 2 === 0;
  };

  const randomizeBoard = () => {
    let temp = [...initialBoard];
    do {
      let currIdx = initialBoard.length;
      let randomIdx = 0;

      while (currIdx > 0) {
        randomIdx = Math.floor(Math.random() * currIdx);
        currIdx--;
        [temp[currIdx], temp[randomIdx]] = [temp[randomIdx], temp[currIdx]];
      }
    } while (!getInversionCount(temp)); //makes sure we generate a board that is solvable

    setInitialBoard(temp.concat());
  };

  const getUserInput = (isUser) => {
    let currUser = isUser ? "initial" : "goal";
    let userPrompt = `Input ${currUser} board from top-left to bottom-right with no spaces\nFor example: "123456780"\nOr you can type 'very easy', 'easy', 'doable', or 'hard' for presets`;
    const regex = /^(?!.*(.).*\1)[0-8]{9}/;
    let regexPassed = true;
    let input;
    do {
      input = prompt(userPrompt, "123456780");
      switch (input) {
        case "very easy":
          input = "123456708";
          regexPassed = false;
          break;
        case "easy":
          input = "120453786";
          regexPassed = false;
          break;
        case "doable":
          input = "012453786";
          regexPassed = false;
          break;
        case "hard":
          input = "871602543";
          regexPassed = false;
          break;
        default:
          if (!regex.test(input)) alert("Input is not eligible");
          break;
      }
    } while (regexPassed);
    input = input.split("");
    for (let i = 0; i < input.length; i++)
      input.splice(i, 1, parseInt(input[i]));

    if (isUser) setInitialBoard(input);
    else setGoalBoard(input);
  };

  const getAlgorithmChange = (e) => {
    console.log(e.target.value);
    setAlgorithm(e.target.value);
  };

  const getHeuristicChange = (e) => {
    console.log(e.target.value);
    setHeuristic(e.target.value);
  };

  const startSearch = () => {
    if (!isSearching) {
      setIsSearching(true);
      console.log("search: ");
      let node = search(initialBoard, goalBoard, algorithm, heuristic);
      setIsSearching(false);
    }
  };

  const generateTree = (node) => {};

  return (
    <>
      <div className="tile-setting-bar">
        <div className="tile-board user">
          <span>Initial Board</span>

          <div className="tiles" id="initial-board">
            {initialBoard.map((value, idx) => (
              <div className={`tile-${value}`} key={idx}>
                {value}
              </div>
            ))}
          </div>
          <button onClick={() => getUserInput(true)} disabled={isSearching}>
            Edit Board
          </button>
          <button onClick={randomizeBoard} disabled={isSearching}>
            Randomize Board
          </button>
        </div>

        <hr id="horizontal-bar"></hr>

        <div className="tile-board goal">
          <span>Goal Board</span>
          <div className="tiles">
            {goalBoard.map((value, idx) => (
              <div className={`tile-${value}`} key={idx}>
                {value}
              </div>
            ))}
          </div>
          <button onClick={() => getUserInput(false)}>Edit Board</button>
        </div>

        <hr id="horizontal-bar"></hr>

        <div className="algorithm-selector">
          <span>Algorithm</span>
          <select
            className="algorithm-dropdown"
            value={algorithm}
            onChange={(e) => getAlgorithmChange(e)}
          >
            <option value="A* Search">A* Search</option>
            <option value="Breadth First Search">Breadth First Search</option>
            <option value="Depth First Search">Depth First Search</option>
          </select>

          {algorithm === "A* Search" && (
            <>
              <span>Heuristic Function</span>
              <select
                className="heuristic-dropdown"
                value={heuristic}
                onChange={(e) => getHeuristicChange(e)}
              >
                <option value="Uniform Cost Search">Uniform Cost Search</option>
                <option value="Misplaced Tile">Misplaced Tile</option>
                <option value="Manhatten Distance">Manhatten Distance</option>
              </select>
            </>
          )}
        </div>
        <hr id="horizontal-bar"></hr>
        <div className="controls-container">
          <span>Controls</span>
          <div className="buttons">
            <ControlButtons
              initialBoard={initialBoard}
              goalBoard={goalBoard}
              algorithm={algorithm}
              heuristic={heuristic}
            ></ControlButtons>
          </div>
        </div>
      </div>
    </>
  );
};

export default TileSetting;
