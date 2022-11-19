import asyncTimeout from './asyncTimeout'

const generatePath = async (gridCopy, setGrid, move) => {
  for (let i = 1; i < move.length; i++) {
    gridCopy[move[i].row][move[i].col].isVisited = false
    gridCopy[move[i].row][move[i].col].isPath = true
    setGrid(gridCopy.concat())
    await asyncTimeout({ timeout: 1 })
  }
}

export default generatePath
