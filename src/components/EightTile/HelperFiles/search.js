import aStarSearch from "./aStarSearch";
import bfs from "./bfs";
import dfs from "./dfs";

const search = async (initialBoard, goalBoard, algorithm, heuristic) => {
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
      await aStarSearch(newInitial, newGoal, heuristic);
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

  console.log(node);
};

export default search;
