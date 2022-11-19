import asyncTimeout from '../../HelperFunctions/asyncTimeout'

let gridCopy

const getRandomInt = (max) => {
  let randomNum =
    Math.floor(Math.random() * (max / 2)) +
    Math.floor(Math.random() * (max / 2))
  if (randomNum % 2 !== 0) {
    if (randomNum === max) {
      randomNum -= 1
    } else {
      randomNum += 1
    }
  }
  return randomNum
}

const generateOddRandomNumber = (arr) => {
  let max = arr.length - 1
  let randomNum =
    Math.floor(Math.random() * (max / 2)) +
    Math.floor(Math.random() * (max / 2))
  if (randomNum % 2 === 0) {
    if (randomNum === max) {
      randomNum -= 1
    } else {
      randomNum += 1
    }
  }
  return arr[randomNum]
}

const chooseOrientation = (w, h) => {
  if (w < h) return true //generate horizontal wall
  else if (w > h) return false //generate vertical wall
  else return getRandomInt(2) === 0
}

const divideGrid = async (setGrid, vertical, horizontal, isHorizontal) => {
  if (horizontal.length < 2 || vertical.length < 2) return

  //if we want to generate horizontal wall, pick a vertical index and vice versa
  let randWallIdx = isHorizontal
    ? generateOddRandomNumber(vertical)
    : generateOddRandomNumber(horizontal)

  await generateWall(setGrid, vertical, horizontal, isHorizontal, randWallIdx)
  if (isHorizontal) {
    await divideGrid(
      setGrid,
      vertical.slice(0, vertical.indexOf(randWallIdx)),
      horizontal,
      chooseOrientation(
        horizontal.length,
        vertical.slice(0, vertical.indexOf(randWallIdx)).length
      )
    )
    await divideGrid(
      setGrid,
      vertical.slice(vertical.indexOf(randWallIdx) + 1),
      horizontal,
      chooseOrientation(
        horizontal.length,
        vertical.slice(vertical.indexOf(randWallIdx) + 1).length
      )
    )
  } else {
    await divideGrid(
      setGrid,
      vertical,
      horizontal.slice(0, horizontal.indexOf(randWallIdx)),
      chooseOrientation(
        horizontal.slice(0, horizontal.indexOf(randWallIdx)).length,
        vertical.length
      )
    )
    await divideGrid(
      setGrid,
      vertical,
      horizontal.slice(horizontal.indexOf(randWallIdx) + 1),
      chooseOrientation(
        horizontal.slice(horizontal.indexOf(randWallIdx) + 1).length,
        vertical.length
      )
    )
  }
}

const generateWall = async (
  setGrid,
  vertical,
  horizontal,
  isHorizontal,
  randWallIdx
) => {
  let isStartFinish = false
  let tempWalls = []
  if (isHorizontal) {
    if (horizontal.length === 2) return
    for (let temp of horizontal) {
      if (
        gridCopy[randWallIdx][temp].isStartingNode ||
        gridCopy[randWallIdx][temp].isFinishingNode
      ) {
        isStartFinish = true
        continue
      }
      tempWalls.push([randWallIdx, temp])
    }
  } else {
    if (vertical.length === 2) return
    for (let temp of vertical) {
      if (
        gridCopy[temp][randWallIdx].isStartingNode ||
        gridCopy[temp][randWallIdx].isFinishingNode
      ) {
        isStartFinish = true
        continue
      }
      tempWalls.push([temp, randWallIdx])
    }
  }
  if (!isStartFinish) tempWalls.splice(getRandomInt(tempWalls.length), 1)

  for (let walls of tempWalls) {
    gridCopy[walls[0]][walls[1]].isWall = true
    setGrid(gridCopy.concat())
    await asyncTimeout({ timeout: 10 })
  }
}

const generateBorder = async (ROW, COLUMN, grid, setGrid) => {
  for (let i = 0; i < COLUMN; ++i) {
    grid[0][i].isWall = true
    grid[ROW - 1][i].isWall = true
    setGrid(grid.concat())
    await asyncTimeout({ timeout: 10 })
  }

  for (let j = 0; j < ROW; ++j) {
    grid[j][0].isWall = true
    grid[j][COLUMN - 1].isWall = true
    setGrid(grid.concat())
    await asyncTimeout({ timeout: 10 })
  }
}

const range = (length) => {
  let result = []
  for (let i = 0; i < length; i++) {
    result.push(i)
  }
  return result
}

const recursiveDivision = async ({ ROW, COLUMN, grid, setGrid }) => {
  //await generateBorder(ROW, COLUMN, grid, setGrid)
  let vertical = range(ROW),
    horizontal = range(COLUMN)
  let isHorizontal = chooseOrientation(COLUMN, ROW)
  gridCopy = grid.concat()
  await divideGrid(setGrid, vertical, horizontal, isHorizontal)
}

export default recursiveDivision
