import React from 'react'
import './HeaderLarge.css'
import logo from '../../static/logo.svg'

// class MenuItem extends React.Component {
//   constructor(props) {
//     super(props)
//   }
//   handleClick = () => {
//     this.props.menu.action(this.props.menu.name)
//   }
//   render() {
//     return <li onClick={this.handleClick}>{this.props.menu.name}</li>
//   }
// }

function MenuItem(props) {
  let handleClick = () => {
    props.menu.action(props.menu.name)
  }
  return <li onClick={handleClick}>{props.menu.name}</li>
}

function Menus(props) {
  return (
    <ul className="menus-large">
      {props.menus.map(menu => <MenuItem menu={menu} key={menu.name} />)}
    </ul>
  )
}

function HeaderLarge(props) {
  return (
    <div className="header-large">
      <img src={logo} alt="logo" />
      <Menus menus={props.menus} />
    </div>
  )
}

export default HeaderLarge
