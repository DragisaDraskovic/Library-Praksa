
import React from 'react'

import { NavLink } from 'react-router-dom'
import { HiOutlineBookOpen as BookIconForNavbar } from 'react-icons/hi'
import { AiOutlineHome as HomeIconForNavbar } from 'react-icons/ai'
import { IoPersonOutline as AdminIconForNavbar } from 'react-icons/io5'
import { GrClose as XIconForNavbar } from 'react-icons/gr'

import './NavbarItems.css'

type NavbarItemsProps = {
  handleNavbar: () => void
}


const NavbarItems = ({ handleNavbar }: NavbarItemsProps) => {
  return (
    <div className='navbar_item_container'>
      <NavLink className='navbar_item_icon' to="/" ><BookIconForNavbar /></NavLink>
      <NavLink className='navbar_item_icon' to="/book" ><HomeIconForNavbar /></NavLink>
      <NavLink className='navbar_item_icon' to="/login" ><AdminIconForNavbar /></NavLink>
      <XIconForNavbar className='navbar_close' onClick={handleNavbar}/>
    </div>
  )
}
export default NavbarItems
