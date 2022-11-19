import asyncTimeout from '../../HelperFunctions/asyncTimeout'
import generatePath from '../../HelperFunctions/generatePath'

let tROW = 0,
  tCOLUMN = 0

let gridCopy = []

let dfsStack = []

let dr = [0, 1, 0, -1],
  dc = [-1, 0, 1, 0]

const isValid = (row, col) => {
  if (row < 0 || col < 0) {
    return false
  } else if (row >= tROW || col >= tCOLUMN) {
    return false
  } else if (gridCopy[row][col].isWall) {
    return false
  } else if (gridCopy[row][col].isVisited) {
    return false
  } else return true
}

const solve = async ({ START_NODE, setGrid }) => {
  let [sRow, sCol] = START_NODE
  let shortestPath = []
  dfsStack.push([sRow, sCol])

  while (dfsStack.length > 0) {
    let curr = dfsStack.pop()
    let row = curr[0],
      col = curr[1]

    if (!isValid(row, col)) continue

    if (gridCopy[row][col].isFinishingNode) {
      for (
        let it = gridCopy[row][col].previousNode;
        it != null;
        it = it.previousNode
      ) {
        shortestPath.unshift(it)
      }
      break
    }
    gridCopy[row][col].isVisited = true
    setGrid(gridCopy.concat())
    for (let i = 0; i < 4; i++) {
      dfsStack.push([row + dr[i], col + dc[i]])
      if (isValid(row + dr[i], col + dc[i]))
        gridCopy[row + dr[i]][col + dc[i]].previousNode = gridCopy[row][col]
    }

    await asyncTimeout({ timeout: 1 })
  }
  return shortestPath
}

const depthFirstSearch = async ({ ROW, COLUMN, grid, setGrid, START_NODE }) => {
  tROW = ROW
  tCOLUMN = COLUMN
  gridCopy = grid.slice()
  let move = await solve({ START_NODE, setGrid })
  dfsStack = []

  generatePath(gridCopy, setGrid, move)
}

export default depthFirstSearch
