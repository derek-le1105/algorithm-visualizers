import aStarSearch from "./aStarSearch";
import bfs from "./bfs";
import dfs from "./dfs";

const search = (initialBoard, goalBoard, algorithm, heuristic) => {
  const newInitial = [];
  const newGoal = [];
  while (initialBoard.length) newInitial.push(initialBoard.splice(0, 3));
  while (goalBoard.length) newGoal.push(goalBoard.splice(0, 3));
  if (algorithm === "A* Search") aStarSearch(newInitial, newGoal, heuristic);
  else if (algorithm === "Breadth First Search") bfs();
  else if (algorithm === "Depth First Search") dfs();
};

export default search;
