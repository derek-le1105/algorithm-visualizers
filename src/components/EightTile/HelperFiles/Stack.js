class Stack {
  constructor() {
    this.stack = [];
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  push(data) {
    this.stack.push(data);
  }

  pop() {
    let max = this.stack.length - 1;
    let item = this.stack[max];
    this.stack.splice(max, 1);
    return item;
  }
}

export default Stack;
