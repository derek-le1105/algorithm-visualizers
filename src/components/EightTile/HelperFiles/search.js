import aStarSearch from "./aStarSearch";
import bfs from "./bfs";
import dfs from "./dfs";

const search = async (
  initialBoard,
  goalBoard,
  algorithm,
  heuristic,
  isStop
) => {
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
      node = await aStarSearch(newInitial, newGoal, heuristic, isStop);
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
