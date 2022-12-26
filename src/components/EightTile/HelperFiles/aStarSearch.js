import Puzzle from "./Puzzle";
import PriorityQueue from "./PriorityQueue";
import Node from "./Node";
import asyncTimeout from "./asyncTimeout";

var currHeuristic;
var goal;
var repeatedPuzzles;
var expandedNodes;
let nodeCount = 0;

//prettier-ignore
const indexList = [
  [0, 0],[0, 1],[0, 2],
  [1, 0],[1, 1],[1, 2],
  [2, 0],[2, 1],[2, 2],
];

const aStarSearch = async (
  initialBoard,
  goalBoard,
  heuristic,
  depth,
  setDepth,
  setNodeCount
) => {
  currHeuristic = heuristic;
  goal = goalBoard;
  repeatedPuzzles = [];
  expandedNodes = 0;
  //const puzzle = new Puzzle(initialBoard);
  //const initialState = new Node(puzzle.state);
  const initialState = new Node(initialBoard);
  const nodesQueue = new PriorityQueue();
  const goalStack = [];
  queueingFunction(nodesQueue, [initialState]);

  repeatedPuzzles.push(
    initialState.problem.map((innerArray) => innerArray.join("")).join("")
  );
  let maxQueueSize = 0;

  while (!nodesQueue.isEmpty()) {
    var node = nodesQueue.get();

    setNodeCount(++nodeCount);
    setDepth(Math.max(depth, node.getDepth()));

    //await changeBoard(node);
    await asyncTimeout({ timeout: 1 });
    node.maxQueueSize = maxQueueSize;
    node.numExpandedNodes = expandedNodes;
    if (isGoalState(node)) {
      getSolutionPath(node, goalStack);
      console.log(goalStack);
      break;
    } else {
      //console.log(node);
      queueingFunction(
        nodesQueue,
        expand(node, getOperators(node.problem), setNodeCount)
      );
      if (nodesQueue.pQueue.length > maxQueueSize)
        maxQueueSize = nodesQueue.pQueue.length;
    }
  }

  return [initialState, goalStack];
};

const expand = (puzzle, puzzleOps, setNodeCount) => {
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

  if (opsToRemove.length !== 4) {
    expandedNodes += 1;
  }

  for (var badOp of opsToRemove) {
    puzzleOps.splice(puzzleOps.indexOf(badOp), 1);
  }

  puzzle.insertIntoTree(puzzle, puzzleOps, expandedChildren);
  nodeCount += puzzleOps.length - 1;
  return expandedChildren;
};

const isRepeated = (puzzleCopy) => {
  const puzzleStr = puzzleCopy
    .map((innerArray) => innerArray.join(""))
    .join("");

  return repeatedPuzzles.includes(puzzleStr);
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
    let tempChild = [].concat.apply([], child.problem);
    let tempGoal = [].concat.apply([], goal);
    for (let ptr = 0; ptr < tempChild.length; ptr++) {
      let [i, j] = indexList[tempChild.indexOf(ptr)];
      let [a, b] = indexList[tempGoal.indexOf(ptr)];
      totalDistance += Math.abs(a - i) + Math.abs(b - j);
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
    let tempChild = [].concat.apply([], child.problem);
    let tempGoal = [].concat.apply([], goal);
    for (let ptr = 0; ptr < tempChild.length; ptr++) {
      if (tempChild[ptr] !== tempGoal[ptr]) {
        numOfMisplacedTiles++;
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
    solutionPath.push(
      goalState.problem.map((innerArray) => innerArray.join("")).join("")
    );
    goalState = goalState.parent;
  }

  if (goalState.parent === null)
    solutionPath.push(
      goalState.problem.map((innerArray) => innerArray.join("")).join("")
    );
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

export default aStarSearch;
