import React from 'react'
import PropTypes from 'prop-types'
import './DragSort.css'

import Store from './store.js'

let placeholder = document.createElement('li')
placeholder.className = 'drag-placeholder'

class DragSortItem extends React.Component {
  dragStart = e => {
    Store.setDraggedItem(e.currentTarget)
    e.dataTransfer.effectAllowed = 'move'
  }

  dragEnd = e => {
    this.props.dragEnd(e.target)
  }

  render() {
    return (
      <li
        data-id={this.props.id}
        draggable={this.props.dragged}
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
  }

  dragStart = dragged => {}

  dragEnd = target => {
    let { from, to } = Store.getTargetPosition()
    let items = this.state.items

    if (Store.isInOldContainer()) {
      target.style.display = 'block'
      target.parentNode.removeChild(placeholder)

      // 获取拖拽修改顺序后的数组
      items = this.changeItems(items, from, to, Store.isLast)
    } else {
      console.log('在新的组件上')
      Store.getNewContiner().removeChild(placeholder)

      let deletedItem = items.splice(from, 1)
      Store.updateNewContainerItems(to, deletedItem[0])
    }

    this.updateState(items)
  }

  dragOver = e => {
    e.preventDefault()
    Store.setDraggedStyle('display', 'none')
    // 为防止 控件 拖动在 placeholder 上出现错误，
    if (e.target.className === 'drag-placeholder') {
      return
    }
    let newContinerInfo = {
      overItem: e.target,
      container: e.target.parentNode,
      items: this.state.items,
      isLast: this.insertPlaceholder(e)
    }
    Store.setNewContinerInfo(newContinerInfo, value => this.updateState(value))
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

  updateState(items) {
    // 如果父组件传入了更新 items 的函数，则本组件不修改state（因为父组件修改后，props 会自动修改当前组件的state），
    // 如果父组件没有传入更新 items 的函数，则本组件必须自己修改 state；
    if (this.props.updateItems !== undefined) {
      this.props.updateItems(items)
    } else {
      this.setState({ items: items })
    }
  }

  render() {
    let list = this.state.items.map((item, index) => (
      <DragSortItem
        key={item.title}
        id={index}
        dragged={true}
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

export default DragSortList
