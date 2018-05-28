import React from 'react'
import HeaderLarge from './HeaderLarge.js'
import HeaderSmall from './HeaderSmall.js'

function menuAction(name) {
  console.log(name)
}

const MENUS = [
  {
    name: '菜单一',
    action: menuAction
  },
  {
    name: '菜单二',
    action: menuAction
  },
  {
    name: '菜单三',
    action: menuAction
  },
  {
    name: '菜单四',
    action: menuAction
  }
]

class WindowWidth extends React.Component {
  constructor() {
    super()
    this.state = { width: document.documentElement.clientWidth }
  }

  componentDidMount() {
    window.addEventListener('resize', this.changeHeaderType.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeHeaderType.bind(this))
  }

  changeHeaderType() {
    this.setState({
      width: document.documentElement.clientWidth
    })
  }

  render() {
    return this.props.children(this.state.width)
  }
}

function Header(props) {
  return (
    <WindowWidth>
      {width =>
        width > 600 ? (
          <HeaderLarge menus={MENUS} />
        ) : (
          <HeaderSmall menus={MENUS} />
        )
      }
    </WindowWidth>
  )
}

export default Header
