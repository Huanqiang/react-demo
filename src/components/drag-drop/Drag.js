import React from 'react'
import PropTypes from 'prop-types'

let Drag = props => {
  let { style, children, x, y, ...other } = props
  return (
    <div
      style={{
        ...style,
        transform: `translate(${x}px, ${y}px)`
      }}
      // onMouseDown={this.dragStart}
      // onMouseUp={this.dragEnd}
      {...other}
    >
      {children}
    </div>
  )
}

function enhanceComponent(Component) {
  class Draggable extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        // 鼠标点击位置相对元素未tranlate之前的位置；
        // 举例：e.pageX -  e.target.offsetLeft - this.state.x - this.state.moveX 即鼠标现在在元素中的位置距离其最左边的距离
        mouseOriginX: 0,
        mouseOriginY: 0,
        // 鼠标拖动了的距离
        moveX: this.props.x || 0,
        moveY: this.props.y || 0
      }
    }

    dragStart = e => {
      console.log('拖拽开始')
      this.selfNode = e.currentTarget
      this.boundNode = e.currentTarget.parentNode

      document.addEventListener('mousemove', this.draging)
      document.addEventListener('mouseup', this.dragEnd)

      this.setState({
        mouseOriginX: e.pageX - this.state.moveX,
        mouseOriginY: e.pageY - this.state.moveY
      })
    }

    draging = e => {
      let { mouseOriginX, mouseOriginY } = this.state
      let moveX = e.pageX - mouseOriginX
      let moveY = e.pageY - mouseOriginY

      // 判断父组件是否限制了移动的方向
      if (this.props.isOnlyX) {
        moveY = this.props.y
      }

      if (this.props.isOnlyY) {
        moveX = this.props.x
      }

      // 处理边界
      let bounds = this.props.bounds
      if (bounds !== undefined) {
        if (typeof bounds !== 'string') {
          // 保证移动不超过边界
          moveX = Math.max(moveX, -bounds.left)
          moveX = Math.min(moveX, bounds.right)
          moveY = Math.max(moveY, -bounds.top)
          moveY = Math.min(moveY, bounds.bottom)
        } else {
          if (bounds === 'parent') {
            moveX = Math.max(moveX, 0)
            moveX = Math.min(
              moveX,
              this.boundNode.clientWidth - this.selfNode.offsetWidth
            )
            moveY = Math.max(moveY, 0)
            moveY = Math.min(
              moveY,
              this.boundNode.clientHeight - this.selfNode.offsetHeight
            )
          }
        }
      }

      console.log('moveX: ' + moveX + '   moveY: ' + moveY)
      // 处理父组件 x，y 的更新
      if (this.props.updater !== undefined) {
        this.props.updater(moveX, moveY)
      }
      this.setState({ moveX, moveY })
    }

    dragEnd = e => {
      console.log('结束拖拽')
      console.log(e.target)

      document.removeEventListener('mousemove', this.draging)
      document.removeEventListener('mouseup', this.dragEnd)
    }

    render() {
      // 必须要把与父组件重复的组件名从 props 删除，否则 Component 会延用父组件的 value，而非你当前传入的那个值
      let { style, children, ...other } = this.props
      return (
        <Component
          onMouseDown={this.dragStart}
          // onMouseUp={this.dragEnd}
          x={this.state.moveX}
          y={this.state.moveY}
          style={style}
          children={children}
        />
      )
    }
  }

  Draggable.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    isOnlyX: PropTypes.bool,
    isOnlyY: PropTypes.bool,
    updater: PropTypes.func,
    bounds: PropTypes.oneOfType([
      PropTypes.shape({
        left: PropTypes.number,
        right: PropTypes.number,
        top: PropTypes.number,
        bottom: PropTypes.number
      }),
      PropTypes.string
    ])
  }

  return Draggable
}

export default enhanceComponent(Drag)
