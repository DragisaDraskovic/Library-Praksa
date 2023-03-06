import React from 'react'

import { NavLink } from 'react-router-dom'
import { VscThreeBars } from 'react-icons/vsc'

import './NavbarItems.css'


const NavbarItems = () => {
  return (
    <div className='navbaritem_container'>
      <NavLink className='navbaritem_item' to="/Options 1" >Options 1</NavLink>
      <NavLink className='navbaritem_item' to="/Options 2" >Options 2</NavLink>
      <NavLink className='navbaritem_item' to="/Options 3" >Options 3</NavLink>
    </div>
  )
}
export default NavbarItems
