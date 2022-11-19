class QElement {
  constructor(element, priority, depth) {
    this.element = element
    this.priority = priority
    this.depth = depth
  }

  getElement() {
    return this.element
  }

  getDepth() {
    return this.depth
  }
}

class priorityQueue {
  constructor() {
    this.items = []
  }

  enqueue(element, priority, depth) {
    var qElement = new QElement(element, priority, depth)
    var contain = false

    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        this.items.splice(i, 0, qElement)
        contain = true
        break
      }
    }

    if (!contain) {
      this.items.push(qElement)
    }
  }

  dequeue() {
    if (this.isEmpty()) return 'Underflow'
    return this.items.shift()
  }

  front() {
    if (this.isEmpty()) return 'No elements in Queue'
    return this.items[0]
  }

  rear() {
    if (this.isEmpty()) return 'No elements in Queue'
    return this.items[this.items.length - 1]
  }

  isEmpty() {
    return this.items.length === 0
  }

  printPQueue() {
    var str = ''
    for (var i = 0; i < this.items.length; i++)
      str += this.items[i].element + ' '
    return str
  }
}

export default priorityQueue
