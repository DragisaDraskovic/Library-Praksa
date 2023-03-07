
import React from 'react'

import { NavLink } from 'react-router-dom'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { AiOutlineHome } from 'react-icons/ai'
import { IoPersonOutline } from 'react-icons/io5'
import { GrClose } from 'react-icons/gr'

import './NavbarItems.css'


const NavbarItems = () => {
  return (
    <div className='navbaritem_container'>
      <NavLink className='navbaritem_icon' to="/" ><HiOutlineBookOpen /></NavLink>
      <NavLink className='navbaritem_icon' to="/book" ><AiOutlineHome /></NavLink>
      <NavLink className='navbaritem_icon' to="/nesto" ><IoPersonOutline /></NavLink>
      <GrClose className='navbar_close'/>
    </div>
  )
}
export default NavbarItems
