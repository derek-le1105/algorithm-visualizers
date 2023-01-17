import Node from "./Node";

const checkGoalState = (puzzle, goal) => {
  //console.log(puzzle);
  const puzzleData = puzzle.problem;
  for (let i = 0; i < puzzleData.length; i++) {
    for (let j = 0; j < puzzleData[0].length; j++) {
      if (puzzleData[i][j] !== goal[i][j]) {
        return false;
      }
    }
  }
  return true;
};

const getSolutionPath = (goalState) => {
  const solutionPath = [];
  while (goalState.parent !== null) {
    solutionPath.push(
      goalState.problem.map((innerArray) => innerArray.join("")).join("")
    );
    goalState = goalState.parent;
  }

  if (goalState.parent === null)
    solutionPath.push(
      goalState.problem.map((innerArray) => innerArray.join("")).join("")
    );

  return solutionPath;
};

const getBlankSpace = (puzzle) => {
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle.length; j++) {
      if (puzzle[i][j] === 0) {
        return [i, j];
      }
    }
  }
};

/*
 * @param {puzzle}
 */
const getOperators = (puzzle) => {
  var opList = [];
  let [blankRow, blankCol] = getBlankSpace(puzzle);
  if (blankRow === 0) {
    //order is left, right, up, down    ULRD
    if (blankCol === 0) {
      opList.push("Right");
      opList.push("Down");
    } else if (blankCol === 1) {
      opList.push("Left");
      opList.push("Right");
      opList.push("Down");
    } else if (blankCol === 2) {
      opList.push("Left");
      opList.push("Down");
    }
  } else if (blankRow === 1) {
    if (blankCol === 0) {
      opList.push("Right");
      opList.push("Up");
      opList.push("Down");
    } else if (blankCol === 1) {
      opList.push("Up");
      opList.push("Left");
      opList.push("Right");
      opList.push("Down");
    } else if (blankCol === 2) {
      opList.push("Up");
      opList.push("Left");
      opList.push("Down");
    }
  } else if (blankRow === 2) {
    if (blankCol === 0) {
      opList.push("Up");
      opList.push("Right");
    } else if (blankCol === 1) {
      opList.push("Up");
      opList.push("Left");
      opList.push("Right");
    } else if (blankCol === 2) {
      opList.push("Up");
      opList.push("Left");
    }
  }
  return opList;
};

const findAvailableMoves = (
  puzzle,
  puzzleOps,
  repeatedPuzzles,
  setNodeCount
) => {
  const expandedChildren = [];
  const opsToRemove = [];
  let [blankRow, blankCol] = getBlankSpace(puzzle.problem);

  for (var op of puzzleOps) {
    let puzzleCopy = JSON.parse(JSON.stringify(puzzle.problem));
    let rowMovement = 0,
      colMovement = 0;

    switch (op) {
      case "Up":
        rowMovement -= 1;
        break;
      case "Down":
        rowMovement += 1;
        break;
      case "Left":
        colMovement -= 1;
        break;
      case "Right":
        colMovement += 1;
        break;
      default:
        break;
    }

    [
      puzzleCopy[blankRow][blankCol],
      puzzleCopy[blankRow + rowMovement][blankCol + colMovement],
    ] = [puzzleCopy[blankRow + rowMovement][blankCol + colMovement], 0];

    if (!isRepeated(puzzleCopy, repeatedPuzzles)) {
      repeatedPuzzles.push(
        puzzleCopy.map((innerArray) => innerArray.join("")).join("")
      );
      let tempNode = new Node(puzzleCopy);
      tempNode.setDepth(puzzle.getDepth() + 1);
      expandedChildren.push(tempNode);
    } else {
      opsToRemove.push(op);
    }
  }

  //if (opsToRemove.length !== 4)
  //  expandedNodes += 1;

  for (var badOp of opsToRemove) {
    puzzleOps.splice(puzzleOps.indexOf(badOp), 1);
  }

  puzzle.insertIntoTree(puzzle, puzzleOps, expandedChildren);
  //nodeCount += puzzleOps.length - 1;
  return expandedChildren;
};

const isRepeated = (puzzleCopy, repeatedPuzzles) => {
  const puzzleStr = puzzleCopy
    .map((innerArray) => innerArray.join(""))
    .join("");

  return repeatedPuzzles.includes(puzzleStr);
};

export { checkGoalState, getSolutionPath, getOperators, findAvailableMoves };
