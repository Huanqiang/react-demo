import React from 'react'
import './wave.css'

class Wave extends React.Component {
  constructor(props) {
    super(props)
    this.wave = React.createRef()
  }

  componentDidMount() {
    let wave = this.wave.current
    wave.style.width = wave.style.height =
      Math.max(wave.parentNode.offsetWidth, wave.parentNode.offsetHeight) + 'px'
  }

  waveAimation(e) {
    let wave = this.wave.current
    let positionX = e.pageX - e.target.offsetLeft - wave.offsetWidth / 2
    let positionY = e.pageY - e.target.offsetTop - wave.offsetHeight / 2
    wave.classList.remove('show')

    wave.style.top = positionY + 'px'
    wave.style.left = positionX + 'px'
    setTimeout(() => {
      wave.classList.add('show')
    }, 20)
  }

  render() {
    return <span ref={this.wave} className="wave" />
  }
}

class ButtonWave extends React.Component {
  constructor() {
    super()
    this.waveComponent = React.createRef()
  }

  touchOffWave = e => {
    this.waveComponent.current.waveAimation(e)
  }

  render() {
    let width = 100
    let height = 70
    return (
      <div className="button-wave" onClick={this.touchOffWave}>
        button
        <Wave ref={this.waveComponent} width={width} height={height} />
      </div>
    )
  }
}

export default ButtonWave
