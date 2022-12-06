import "./TileSetting.css";

import { useState } from "react";

const inital = [1, 2, 3, 4, 5, 6, 7, 8, 0];
const goal = [1, 2, 3, 4, 5, 6, 7, 8, 0];

const TileSetting = () => {
  const [initialBoard, setInitialBoard] = useState(inital);
  const [goalBoard, setGoalBoard] = useState(goal);

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
    } while (!getInversionCount(temp));

    setInitialBoard(temp.concat());
  };

  const getUserInput = (isUser) => {
    let currUser = isUser ? "initial" : "goal";
    let userPrompt = `Input ${currUser} board from top-left to bottom-right with no spaces\nFor example: "123456780"`;
    let regex = /^(?!.*(.).*\\1)\\d{9}/;
    let regexPassed = true;
    let input;
    do {
      input = prompt(userPrompt).split("");
      if (!regex.test(input)) alert("Input is not eligible");
      else if (input.length < 9 || input.length > 9)
        alert("Input length is no eligible");
      else regexPassed = false;
    } while (regexPassed);

    if (isUser) setInitialBoard(input);
    else setGoalBoard(input);
  };

  return (
    <>
      <div className="tile-setting-bar">
        <div className="tile-board user">
          <span>Initial Board</span>

          <div className="tiles">
            {initialBoard.map((value, idx) => (
              <div className={`tile-${value}`} key={idx}>
                {value}
              </div>
            ))}
          </div>
          <button onClick={() => getUserInput(true)}>Edit Board</button>
          <button onClick={randomizeBoard}>Randomize Board</button>
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
          <select className="algorithm-dropdown">
            <option value="A* Search">A* Search</option>
            <option value="Breadth First Search">Breadth First Search</option>
            <option value="Depth First Search">Depth First Search</option>
          </select>
          <span>Heuristic Function</span>
          <select className="heuristic-dropdown">
            <option value="Misplaced Tile">Misplaced Tile</option>
            <option value="Manhatten Distance">Manhatten Distance</option>
            <option value="Uniformed Cost Search">Uniformed Cost Search</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default TileSetting;
