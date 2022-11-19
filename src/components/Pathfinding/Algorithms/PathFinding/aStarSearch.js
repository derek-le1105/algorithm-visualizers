import priorityQueue from '../../HelperFunctions/priorityQueue'
import asyncTimeout from '../../HelperFunctions/asyncTimeout'
import generatePath from '../../HelperFunctions/generatePath'

var tROW
var tCOL

const manhattanDistance = (node, END_NODE) => {
  let currRow = node.row
  let currCol = node.col
  let distance = 0
  for (let i = currRow; i < END_NODE[0]; ++i) distance++
  for (let j = currCol; j < END_NODE[1]; ++j) distance++
  return distance
}

const expandNode = async (node, grid, setGrid, priorityQueue, END_NODE) => {
  let dr = [1, -1, 0, 0],
    dc = [0, 0, 1, -1]
  let currNode = node.getElement()
  for (let i = 0; i < 4; i++) {
    let tempRow = currNode.row + dr[i]
    let tempCol = currNode.col + dc[i]

    if (tempRow < 0 || tempCol < 0) continue
    if (tempRow >= tROW || tempCol >= tCOL) continue
    let tempNode = grid[tempRow][tempCol]
    if (tempNode.isWall || tempNode.isVisited) continue

    //if tempNode is new node that is valid, find manhattan distance
    let childDepth = node.getDepth() + 1
    let childHn = manhattanDistance(tempNode, END_NODE)
    await asyncTimeout({ timeout: 10 })
    priorityQueue.enqueue(
      grid[tempRow][tempCol],
      childHn + childDepth,
      childDepth
    )
    tempNode.previousNode = currNode
  }
  currNode.isVisited = true
  setGrid(grid.concat())
  await asyncTimeout({ timeout: 10 })

  //console.log(priorityQueue)
}

const aStarSearch = async ({
  ROW,
  COLUMN,
  grid,
  setGrid,
  START_NODE,
  END_NODE,
}) => {
  tROW = ROW
  tCOL = COLUMN
  var nodes = new priorityQueue()
  let shortestPath = []
  let finishNodeFound = false
  nodes.enqueue(grid[START_NODE[0]][START_NODE[1]], 0, 0)

  while (!nodes.isEmpty() && !finishNodeFound) {
    let currNode = nodes.dequeue()
    if (currNode.getElement().isFinishingNode) {
      for (
        let it = currNode.getElement().previousNode;
        it != null;
        it = it.previousNode
      )
        shortestPath.unshift(it)
      finishNodeFound = true
    } else {
      await expandNode(currNode, grid, setGrid, nodes, END_NODE)
    }
  }
  generatePath(grid, setGrid, shortestPath)
}

export default aStarSearch
