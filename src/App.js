import React, { Component } from 'react'
import Header from './components/header'
import ButtonWave from './components/button/wave.js'
import './App.css'

import OtherTest from './components/otherTemp'

// import DragTest from './components/drag-drop/test.js'
// import DragSort from './components/dragSort/DragSort.js'
import DragSort from './components/dragSortTwoList'
import DragComponent from './components/drag-drop'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ButtonWave />
        <DragSort />
        <OtherTest />
        <DragComponent />
      </div>
    )
  }
}

export default App
