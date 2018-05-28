var Store = {
  curDragged: null,
  newContainer: null,
  newItems: [],
  updateHandler: null,
  overItem: null,
  isLast: false,
  // newContainer:
  setNewContinerInfo({ container, items, overItem, isLast }, updateHandler) {
    this.newContainer = container
    this.newItems = items
    this.overItem = overItem
    this.isLast = isLast
    this.updateHandler = updateHandler
  },
  setDraggedItem(value) {
    this.curDragged = value
  },
  getDraggedItem() {
    return this.curDragged
  },
  setDraggedStyle(key, value) {
    this.curDragged.style[key] = value
  },
  getNewContiner() {
    return this.newContainer
  },
  updateNewContainerItems(to, deletedItem) {
    if (this.isLast) to++
    this.newItems.splice(to, 0, deletedItem)
    this.updateHandler(this.newItems)
  },
  getNewItems() {
    return this.newItems
  },
  getNewContainerHandler() {
    return this.updateHandler
  },
  getOverItem() {
    return this.overItem.dataset.id
  },
  getTargetPosition() {
    return { from: this.curDragged.dataset.id, to: this.overItem.dataset.id }
  },
  isInOldContainer() {
    return this.curDragged.parentNode === this.newContainer
  }
}
export default Store
