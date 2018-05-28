import React from 'react'
import PropTypes from 'prop-types'
import './DragSort.css'

let source = [
  { title: '123' },
  { title: '234' },
  { title: '345' },
  { title: '456' }
]

let placeholder = document.createElement('li')
placeholder.className = 'drag-placeholder'

class DragSortItem extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  dragStart = e => {
    this.props.dragStart(e.currentTarget)
    e.dataTransfer.effectAllowed = 'move'
  }

  dragEnd = e => {
    this.props.dragEnd(e.target)
  }

  render() {
    return (
      <li
        data-id={this.props.id}
        draggable={this.props.canDrag}
        onDragStart={this.dragStart}
        onDragEnd={this.dragEnd}
      >
        {this.props.children}
      </li>
    )
  }
}

class DragSortList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: this.props.items }
    this.dragged = null
    this.last = null
    // 判断是否是最后一个元素
    this.targetIsLast = false
  }

  dragStart = dragged => {
    this.dragged = dragged
  }

  dragEnd = target => {
    target.style.display = 'block'
    target.parentNode.removeChild(placeholder)

    let from = this.dragged.dataset.id
    let to = this.last.dataset.id

    // 获取拖拽修改顺序后的数组
    let items = this.changeItems(this.state.items, from, to, this.targetIsLast)
    // 如果父组件传入了更新 items 的函数，则本组件不修改state（因为父组件修改后，props 会自动修改当前组件的state），
    // 如果父组件没有传入更新 items 的函数，则本组件必须自己修改 state；
    if (this.props.updateItems !== undefined) {
      this.props.updateItems(items)
    } else {
      this.setState({ items: items })
    }
  }

  dragOver = e => {
    e.preventDefault()
    this.dragged.style.display = 'none'
    // 为防止 控件 拖动在 placeholder 上出现错误，
    if (e.target.className === 'drag-placeholder') {
      return
    }
    this.last = e.target

    this.targetIsLast = this.insertPlaceholder(e)
  }

  // 返回当前插入的位置是否为列表的最后
  insertPlaceholder(e) {
    let lastElementCenterY =
      e.target.parentNode.offsetTop +
      e.target.parentNode.offsetHeight -
      e.target.offsetHeight / 2

    if (e.pageY > lastElementCenterY) {
      e.target.parentNode.appendChild(placeholder)
      return true
      // e.target.parentNode.insertBefore(placeholder, e.target.nextElementSibling)
    } else {
      e.target.parentNode.insertBefore(placeholder, e.target)
      return false
    }
  }

  changeItems(items, from, to, isLast) {
    if (from < to) to--
    // 如果是最后一个元素，则要 to 后移以为
    if (isLast) to++

    items.splice(to, 0, items.splice(from, 1)[0])
    return items
  }

  render() {
    let list = this.state.items.map((item, index) => (
      <DragSortItem
        key={item.title}
        id={index}
        canDrag={true}
        dragStart={this.dragStart}
        dragEnd={this.dragEnd}
      >
        {item.title}
      </DragSortItem>
    ))
    return (
      <ul className="drag-sort-container" onDragOver={this.dragOver}>
        {list}
      </ul>
    )
  }
}

DragSortList.propTypes = {
  items: PropTypes.array.isRequired,
  updateItems: PropTypes.func
}

class DragSortTest extends React.Component {
  constructor() {
    super()
    this.state = { items: source }
  }

  update = items => {
    this.setState({ items: items })
  }

  render() {
    return (
      <div>
        <DragSortList items={this.state.items} updateItems={this.update} />
        {this.state.items.map(item => item.title).toString()}
      </div>
    )
  }
}

export default DragSortTest
