import './index.css'

import React, { Component } from 'react'

export default class Node extends Component {
  render() {
    const {
      row,
      col,
      isVisited,
      isFinish,
      isStart,
      isWall,
      isPath,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
    } = this.props
    //console.log(this.props)

    const classDeciderName = isFinish
      ? 'node finishing'
      : isStart
      ? 'node starting'
      : isWall
      ? 'node wall'
      : isVisited
      ? 'node visited'
      : isPath
      ? 'node path'
      : 'node'

    return (
      <div
        id={`node-${row}-${col}`}
        className={`${classDeciderName}`}
        onMouseDown={(e) => {
          if (e.button === 0) onMouseDown(row, col)
        }}
        onMouseUp={(e) => {
          if (e.button === 0) onMouseUp()
        }}
        onMouseEnter={(e) => {
          if (e.button === 0) onMouseEnter(row, col)
        }}
      ></div>
    )
  }
}
