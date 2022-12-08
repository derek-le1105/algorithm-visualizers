import Puzzle from "./Puzzle";
import PriorityQueue from "./PriorityQueue";
import Stack from "./Stack";
import Node from "./Node";
import asyncTimeout from "./asyncTimeout";

var currHeuristic;
var goal;
var repeatedPuzzles;
var expandedNodes;

const indexList = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
];

const aStarSearch = async (initialBoard, goalBoard, heuristic) => {
  currHeuristic = heuristic;
  goal = goalBoard;
  repeatedPuzzles = [];
  expandedNodes = 0;
  const puzzle = new Puzzle(initialBoard);
  const initialState = new Node(puzzle.state);
  const nodesQueue = new PriorityQueue();
  queueingFunction(nodesQueue, [initialState]);

  repeatedPuzzles.push(
    initialState.problem.map((innerArray) => innerArray.join("")).join("")
  );
  let maxQueueSize = 0;

  while (!nodesQueue.isEmpty()) {
    var node = nodesQueue.get();

    await changeBoard(node);
    node.maxQueueSize = maxQueueSize;
    node.numExpandedNodes = expandedNodes;
    if (isGoalState(node)) {
      alert("found");
      const goalStack = new Stack();
      getSolutionPath(node, goalStack);

      while (!goalStack.isEmpty()) {
        let solutionNode = goalStack.pop();
        console.log(
          `Optimal state to expand with g(n) of ${solutionNode.getGN()} and h(n) of ${solutionNode.getHN()} is: `
        );
        printTable(solutionNode.problem);
      }
      break;
    } else {
      //console.log(node);
      queueingFunction(
        nodesQueue,
        expand(node, puzzle.getOperators(node.problem))
      );
      if (nodesQueue.pQueue.length > maxQueueSize)
        maxQueueSize = nodesQueue.pQueue.length;
    }
  }
};

const changeBoard = async (node) => {
  await asyncTimeout({ timeout: 1 });
  let board = document.getElementById("main-board");
  while (board.firstChild) board.removeChild(board.firstChild);

  let count = 0;
  for (let i = 0; i < node.problem.length; i++) {
    for (let j = 0; j < node.problem[0].length; j++) {
      let newTile = document.createElement("div");
      newTile.className = `tile-${count}`;
      newTile.innerHTML = node.problem[i][j];
      board.appendChild(newTile);
      ++count;
    }
  }
};

const printTable = (puzzle) => {
  let output = "";
  for (let i = 0; i < puzzle.length; ++i) output += puzzle[i].toString() + "\n";
  console.log(output);
};

const expand = (puzzle, puzzleOps) => {
  const expandedChildren = [];
  const opsToRemove = [];
  let blankRow, blankCol;
  for (let i = 0; i < puzzle.problem.length; i++) {
    for (let j = 0; j < puzzle.problem.length; j++) {
      if (puzzle.problem[i][j] === 0) {
        blankRow = i;
        blankCol = j;
        break;
      }
    }
  }

  for (var op of puzzleOps) {
    let puzzleCopy = JSON.parse(JSON.stringify(puzzle.problem));
    let tileToSwap;
    if (op === "Up") {
      tileToSwap = puzzleCopy[blankRow - 1][blankCol];
      puzzleCopy[blankRow][blankCol] = tileToSwap;
      puzzleCopy[blankRow - 1][blankCol] = 0;
    } else if (op === "Left") {
      tileToSwap = puzzleCopy[blankRow][blankCol - 1];
      puzzleCopy[blankRow][blankCol] = tileToSwap;
      puzzleCopy[blankRow][blankCol - 1] = 0;
    } else if (op === "Right") {
      tileToSwap = puzzleCopy[blankRow][blankCol + 1];
      puzzleCopy[blankRow][blankCol] = tileToSwap;
      puzzleCopy[blankRow][blankCol + 1] = 0;
    } else if (op === "Down") {
      tileToSwap = puzzleCopy[blankRow + 1][blankCol];
      puzzleCopy[blankRow][blankCol] = tileToSwap;
      puzzleCopy[blankRow + 1][blankCol] = 0;
    }
    if (!isRepeated(puzzleCopy)) {
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

  if (opsToRemove.length !== 4) expandedNodes += 1;

  for (var badOp of opsToRemove) {
    puzzleOps.splice(puzzleOps.indexOf(badOp), 1);
  }

  puzzle.insertIntoTree(puzzle, puzzleOps, expandedChildren);
  return expandedChildren;
};

const isRepeated = (puzzleCopy) => {
  const puzzleStr = puzzleCopy
    .map((innerArray) => innerArray.join(""))
    .join("");
  for (var state of repeatedPuzzles) {
    if (puzzleStr === state) return true;
  }
  return false;
};

const queueingFunction = (nodes, expandedChildren) => {
  switch (currHeuristic) {
    case "Uniform Cost Search":
      uniformCostSearch(nodes, expandedChildren);
      break;

    case "Misplaced Tile":
      misplacedTile(nodes, expandedChildren);
      break;

    case "Manhattan Distance":
      manhattanDistance(nodes, expandedChildren);
      break;

    default:
      break;
  }
};

const uniformCostSearch = (nodes, expandedChildren) => {
  for (var child of expandedChildren) {
    child.setGN(child.getDepth());
    child.setFN();
    nodes.insert(child);
  }
};

const manhattanDistance = (nodes, expandedChildren) => {
  for (var child of expandedChildren) {
    let totalDistance = 0;
    for (var index of indexList) {
      let i,
        j = index;
      if (child.problem[i][j] !== goal[i][j] && child.problem[i][j] !== 0) {
        let a,
          b = indexList[child.problem[i][j] - 1];
        totalDistance += Math.abs(a - i) + Math.abs(b - j);
      }
    }
    child.setGN(child.getDepth());
    child.setHN(totalDistance);
    child.setFN();
    nodes.insert(child);
  }
};

const misplacedTile = (nodes, expandedChildren) => {
  for (var child of expandedChildren) {
    let numOfMisplacedTiles = 0;
    for (var index of indexList) {
      let [i, j] = index;
      if (child.problem[i][j] !== goal[i][j] && child.problem[i][j] !== 0) {
        numOfMisplacedTiles += 1;
      }
    }
    child.setGN(child.getDepth());
    child.setHN(numOfMisplacedTiles);
    child.setFN();
    nodes.insert(child);
  }
};

const isGoalState = (puzzle) => {
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

const getSolutionPath = (goalState, solutionPath) => {
  while (goalState.parent !== null) {
    solutionPath.push(goalState);
    goalState = goalState.parent;
  }

  if (goalState.parent === null) solutionPath.push(goalState);
};

export default aStarSearch;
