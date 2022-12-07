class Puzzle {
  constructor(data) {
    this.state = data;
  }

  getBlankSpace(puzzle) {
    for (let i = 0; i < puzzle.length; i++) {
      for (let j = 0; j < puzzle.length; j++) {
        if (puzzle[i][j] === 0) {
          return [i, j];
        }
      }
    }
  }

  getOperators(puzzle) {
    var opList = [];
    let [blankRow, blankCol] = this.getBlankSpace(puzzle);
    if (blankRow === 0) {
      //order is left, right, up, down    ULRD
      if (blankCol === 0) {
        opList.push("Right");
        opList.push("Down");
      } else if (blankCol === 1) {
        opList.push("Left");
        opList.push("Right");
        opList.push("Down");
      } else if (blankCol === 2) {
        opList.push("Left");
        opList.push("Down");
      }
    } else if (blankRow === 1) {
      if (blankCol === 0) {
        opList.push("Right");
        opList.push("Up");
        opList.push("Down");
      } else if (blankCol === 1) {
        opList.push("Up");
        opList.push("Left");
        opList.push("Right");
        opList.push("Down");
      } else if (blankCol === 2) {
        opList.push("Up");
        opList.push("Left");
        opList.push("Down");
      }
    } else if (blankRow === 2) {
      if (blankCol === 0) {
        opList.push("Up");
        opList.push("Right");
      } else if (blankCol === 1) {
        opList.push("Up");
        opList.push("Left");
        opList.push("Right");
      } else if (blankCol === 2) {
        opList.push("Up");
        opList.push("Left");
      }
    }
    return opList;
  }
}

export default Puzzle;
