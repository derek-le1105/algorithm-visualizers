import { useState } from "react";

import aStarSearch from "../HelperFiles/aStarSearch";
import bfs from "../HelperFiles//bfs";
import dfs from "../HelperFiles//dfs";

import Puzzle from "../HelperFiles//Puzzle";
import PriorityQueue from "../HelperFiles//PriorityQueue";
import Stack from "../HelperFiles//Stack";
import Node from "../HelperFiles//Node";

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
          if (child.problem[i][j] !== goal[i][j] && child.problem[i][j] !== 0) {
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

const ControlButtons = ({ initialBoard, goalBoard, algorithm, heuristic }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [isStop, setIsStop] = useState(false);

  const handleStart = () => {
    if (!isSearching) {
      setIsSearching(true);
      setIsSearching(false);
    }
  };

  const handleStop = () => {
    setIsStop(!isStop);
  };

  return (
    <>
      <div className="button-container">
        <button onClick={handleStart}>Start</button>
        <button>Reset</button>
        <button onClick={handleStop}>Pause</button>
      </div>
    </>
  );
};

export default ControlButtons;
