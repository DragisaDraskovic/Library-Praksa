import {  MouseEventHandler } from 'react'

import { NavLink } from 'react-router-dom'
import { AiOutlineHome as HomeIconForNavbar, AiOutlinePlusCircle as PlusIconForNavbar } from 'react-icons/ai'
import { IoPersonOutline as AdminIconForNavbar } from 'react-icons/io5'


import './NavbarItems.css'

interface OpenModal {
  setModalIsOpen: MouseEventHandler<HTMLAnchorElement>
}

const NavbarItems = ({ setModalIsOpen }: OpenModal) => {

  return (
    <div className='navbar_item_container'>
      <NavLink className='navbar_item_icon' to="/" onClick={setModalIsOpen}><PlusIconForNavbar size='30px'/></NavLink>
      <NavLink className='navbar_item_icon' to="/book" ><HomeIconForNavbar size='30px' /></NavLink>
      <NavLink className='navbar_item_icon' to="/login" ><AdminIconForNavbar size='30px' /></NavLink>
    </div>
  )
}
export default NavbarItems
