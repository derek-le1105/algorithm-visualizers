import aStarSearch from "./aStarSearch";
import bfs from "./bfs";
import dfs from "./dfs";

const search = async (
  initialBoard,
  goalBoard,
  algorithm,
  heuristic,
  isStop,
  setDepth,
  setNodeCount
) => {
  const tempInitial = [...initialBoard];
  const tempGoal = [...goalBoard];
  const newInitial = [];
  const newGoal = [];
  let goalData;
  //make arrays 2d for checking in search

  while (tempInitial.length) newInitial.push(tempInitial.splice(0, 3));
  while (tempGoal.length) newGoal.push(tempGoal.splice(0, 3));
  switch (algorithm) {
    case "A* Search":
      goalData = await aStarSearch(
        newInitial,
        newGoal,
        heuristic,
        isStop,
        setDepth,
        setNodeCount
      );
      break;

    case "Breadth First Search":
      goalData = bfs();
      break;

    case "Depth First Search":
      goalData = dfs();
      break;

    default:
      break;
  }

  return goalData;
};

export default search;
