import React from 'react'
import DragSortList from './DragSort.js'

let source = [
  { title: '123' },
  { title: '234' },
  { title: '345' },
  { title: '456' }
]

class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = { items: this.props.source }
  }

  update = items => {
    this.setState({ items: items })
  }

  render() {
    return (
      <div style={{ width: '300px', margin: '20px', display: 'inline-block' }}>
        <DragSortList items={this.state.items} updateItems={this.update} />
        {this.state.items.map(item => item.title).toString()}
      </div>
    )
  }
}

function DragSortTest() {
  return (
    <div>
      <Test source={source} />
      <Test source={[{ title: '789' }, { title: '678' }, { title: '567' }]} />
    </div>
  )
}

export default DragSortTest
