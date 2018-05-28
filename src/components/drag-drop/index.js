import React from 'react'
import Drag from './Drag.js'

class DragTest extends React.Component {
  constructor() {
    super()
    this.state = {
      x: 20,
      y: 30
    }
  }

  update = (x, y) => {
    this.setState({ x, y })
  }

  render() {
    let fatherStyle = {
      width: '300px',
      height: '300px',
      margin: '20px auto',
      border: '10x solid black',
      background: 'yellow'
    }
    let style = {
      width: '100px',
      height: '100px',
      background: 'red'
    }
    return (
      <div style={fatherStyle}>
        <Drag
          style={style}
          x={this.state.x}
          y={this.state.y}
          updater={this.update}
          // isOnlyX={true}
          // bounds={{ left: 100, right: 100, top: 100, bottom: 100 }}
          bounds={'parent'}
        >
          <button>我是一个按钮</button>{' '}
          {`x: ${this.state.x}, y: ${this.state.y}`}
        </Drag>
      </div>
    )
  }
}

export default DragTest
