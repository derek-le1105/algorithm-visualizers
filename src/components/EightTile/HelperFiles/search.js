import aStarSearch from "./aStarSearch";
import bfs from "./bfs";
import dfs from "./dfs";

import Puzzle from "./Puzzle";
import PriorityQueue from "./PriorityQueue";
import Stack from "./Stack";
import Node from "./Node";

const search = async (initialBoard, goalBoard, algorithm, heuristic) => {
  class Search {
    constructor(
      puzzle,
      goal,
      nodesQueue,
      repeatedPuzzles,
      expandedNodes,
      heuristic
    ) {
      this.initialState = new Node(new Puzzle(puzzle).state);
      this.goal = goal;
      this.heuristic = heuristic;
      this.repeatedPuzzles = repeatedPuzzles;
      this.expandedNodes = expandedNodes;
      this.nodesQueue = nodesQueue;

      const uniformCostSearch = (nodes, expandedChildren) => {
        for (var child of expandedChildren) {
          child.setGN(child.getDepth());
          child.setFN();
          nodes.insert(child);
        }
      };

      const manhattanDistance = (nodes, expandedChildren, isMisplaced) => {
        //prettier-ignore
        const indexList = [
          [0, 0],[0, 1],[0, 2],
          [1, 0],[1, 1],[1, 2],
          [2, 0],[2, 1],[2, 2],
        ];

        for (var child of expandedChildren) {
          let totalDistance = 0;
          for (var index of indexList) {
            let i,
              j = index;
            if (
              child.problem[i][j] !== goal[i][j] &&
              child.problem[i][j] !== 0
            ) {
              if (isMisplaced) {
                totalDistance += 1;
              } else {
                let a,
                  b = indexList[child.problem[i][j] - 1];
                totalDistance += Math.abs(a - i) + Math.abs(b - j);
              }
            }
          }
          child.setGN(child.getDepth());
          child.setHN(totalDistance);
          child.setFN();
          nodes.insert(child);
        }
      };

      function queueingFunction(nodes, expandedChildren) {
        switch (this.heuristic) {
          case "Uniform Cost Search":
            uniformCostSearch(nodes, expandedChildren);
            break;

          case "Misplaced Tile":
            manhattanDistance(nodes, expandedChildren, true);
            break;

          case "Manhattan Distance":
            manhattanDistance(nodes, expandedChildren, false);
            break;

          default:
            break;
        }
      }
    }
  }

  const tempInitial = [...initialBoard];
  const tempGoal = [...goalBoard];
  const newInitial = [];
  const newGoal = [];
  let node;

  //make arrays 2d for checking in search
  while (tempInitial.length) newInitial.push(tempInitial.splice(0, 3));
  while (tempGoal.length) newGoal.push(tempGoal.splice(0, 3));

  switch (algorithm) {
    case "A* Search":
      node = aStarSearch(newInitial, newGoal, heuristic);
      break;

    case "Breadth First Search":
      node = bfs();
      break;

    case "Depth First Search":
      node = dfs();
      break;

    default:
      break;
  }

  return node;
};

export default search;
