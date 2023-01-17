import Node from "./Node";
import asyncTimeout from "./asyncTimeout";
import {
  checkGoalState,
  getSolutionPath,
  getOperators,
  findAvailableMoves,
} from "./treeSearchFiles.js";

var goal;
var repeatedPuzzles;
let nodeCount = 0;

const bfs = async (initialBoard, goalBoard, depth, setDepth, setNodeCount) => {
  goal = goalBoard;
  repeatedPuzzles = [];

  const initialState = new Node(initialBoard);
  let goalStack = [];
  const queue = [];

  repeatedPuzzles.push(
    initialState.problem.map((innerArray) => innerArray.join("")).join("")
  );
  queue.push(initialState);
  while (queue.length > 0) {
    setNodeCount(++nodeCount);
    await asyncTimeout({ timeout: 1 });
    let node = queue.shift();
    if (checkGoalState(node, goal)) {
      goalStack = getSolutionPath(node);
      break;
    }
    let availableMoves = findAvailableMoves(
      node,
      getOperators(node.problem),
      repeatedPuzzles,
      setNodeCount
    );

    for (var move of availableMoves) {
      queue.push(move);
    }
  }

  return [initialState, goalStack];
};

export default bfs;
