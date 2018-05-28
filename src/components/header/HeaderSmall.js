import React from 'react'
import './HeaderSmall.css'

function MenusIcon(props) {
  function changeMenuState() {
    props.menuStateChange()
  }
  return (
    <div className="menu-icon-container" onClick={changeMenuState}>
      <div className="menu-icon" />
    </div>
  )
}

class MenuItem extends React.Component {
  handleClick = () => {
    this.props.menu.action(this.props.menu.name)
  }
  render() {
    return <li onClick={this.handleClick}>{this.props.menu.name}</li>
  }
}

function Menus(props) {
  return (
    <ul className={props.menuState ? 'menus-pop' : 'menus-pop menus-hidden'}>
      {props.menus.map(menu => <MenuItem menu={menu} key={menu.name} />)}
    </ul>
  )
}

class HeaderSmall extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menusShow: false
    }
  }
  menuStateChange = () => {
    this.setState(preState => {
      return { menusShow: !preState.menusShow }
    })
  }
  render() {
    return (
      <div className="header-small">
        <MenusIcon menuStateChange={this.menuStateChange} />
        <Menus menus={this.props.menus} menuState={this.state.menusShow} />
      </div>
    )
  }
}

export default HeaderSmall
