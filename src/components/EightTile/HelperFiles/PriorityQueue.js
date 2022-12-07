class PriorityQueue {
  constructor() {
    this.pQueue = [];
  }

  isEmpty() {
    return this.pQueue.length === 0;
  }

  insert(data) {
    this.pQueue.push(data);
  }

  get() {
    let max = 0;
    for (let i = 0; i < this.pQueue.length; i++) {
      if (this.pQueue[i].getFN() < this.pQueue[max].getFN()) max = i;
    }
    let item = this.pQueue[max];
    this.pQueue.splice(max, 1);
    return item;
  }
}

export default PriorityQueue;
