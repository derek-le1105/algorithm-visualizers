import asyncTimeout from '../../HelperFunctions/asyncTimeout'
import generatePath from '../../HelperFunctions/generatePath'

let tROW = 0,
  tCOLUMN = 0

let gridCopy = []

let rowQueue = [],
  colQueue = []

let dr = [-1, 1, 0, 0],
  dc = [0, 0, 1, -1]

const exploreNeighbors = (row, col, setGrid) => {
  for (let i = 0; i < 4; i++) {
    let rr = row + dr[i]
    let cc = col + dc[i]
    if (rr < 0 || cc < 0) continue
    if (rr >= tROW || cc >= tCOLUMN) continue
    if (gridCopy[rr][cc].isStart) continue
    if (gridCopy[rr][cc].isWall) continue
    if (gridCopy[rr][cc].isVisited) {
      continue
    }

    rowQueue.push(rr)
    colQueue.push(cc)
    gridCopy[rr][cc].isVisited = true
    gridCopy[rr][cc].previousNode = gridCopy[rr - dr[i]][cc - dc[i]]
    setGrid(gridCopy.concat())
  }
}

const solve = async ({ START_NODE, setGrid }) => {
  let [sRow, sCol] = START_NODE
  let shortestPath = []
  rowQueue.push(sRow)
  colQueue.push(sCol)
  gridCopy[sRow][sCol].isVisited = true

  while (rowQueue.length > 0 || colQueue.length > 0) {
    let r = rowQueue.shift(),
      c = colQueue.shift()
    if (gridCopy[r][c].isFinishingNode) {
      for (
        let it = gridCopy[r][c].previousNode;
        it != null;
        it = it.previousNode
      ) {
        shortestPath.unshift(it)
      }
      break
    }
    exploreNeighbors(r, c, setGrid)

    await asyncTimeout({ timeout: 1 })
  }
  return shortestPath
}

const breadthFirstSearch = async ({
  ROW,
  COLUMN,
  grid,
  setGrid,
  START_NODE,
}) => {
  tROW = ROW
  tCOLUMN = COLUMN
  gridCopy = grid.slice()
  let move = await solve({ START_NODE, setGrid })
  rowQueue = []
  colQueue = []

  generatePath(gridCopy, setGrid, move)
}

export default breadthFirstSearch
