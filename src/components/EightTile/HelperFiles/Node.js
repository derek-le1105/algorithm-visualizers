class Node {
  constructor(data) {
    this.problem = data;
    this.gN = 0;
    this.hN = 0;
    this.fN = 0;
    this.depth = 0;
    this.left = null;
    this.right = null;
    this.up = null;
    this.down = null;
    this.parent = null;
    this.maxQueueSize = 0;
    this.numExpandedNodes = 0;
  }

  getGN() {
    return this.gN;
  }

  getHN() {
    return this.hN;
  }

  getFN() {
    return this.fN;
  }

  getDepth() {
    return this.depth;
  }

  setGN(newGN) {
    this.gN = newGN;
  }

  setHN(newHN) {
    this.hN = newHN;
  }

  setFN() {
    this.fN = this.getGN() + this.getHN();
  }

  setDepth(newDepth) {
    this.depth = newDepth;
  }

  insertIntoTree(parent, puzzleOps, expandedChildren) {
    for (var op of puzzleOps) {
      if (op === "Left") {
        parent.left = expandedChildren[puzzleOps.indexOf("Left")];
        parent.left.parent = parent;
      } else if (op === "Right") {
        parent.right = expandedChildren[puzzleOps.indexOf("Right")];
        parent.right.parent = parent;
      } else if (op === "Up") {
        parent.up = expandedChildren[puzzleOps.indexOf("Up")];
        parent.up.parent = parent;
      } else if (op === "Down") {
        parent.down = expandedChildren[puzzleOps.indexOf("Down")];
        parent.down.parent = parent;
      }
    }
  }
}

export default Node;
