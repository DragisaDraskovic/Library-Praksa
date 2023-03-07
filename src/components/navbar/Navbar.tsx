
import React, { useState } from 'react'


import { NavLink } from 'react-router-dom'
import { HiOutlineBookOpen as BookIconForNavbar } from 'react-icons/hi'
import { AiOutlineHome as HomeIconForNavbar } from 'react-icons/ai'
import { IoPersonOutline as AdminIconForNavbar } from 'react-icons/io5'
import { GrClose as XIconForNavbar } from 'react-icons/gr'
import { MdOutlineMenu as ThreeLineIconForNavbar } from 'react-icons/md'

import './Navbar.css'
import NavbarItems from './navbarItems/NavbarItems'


const Navbar = () => {
  const [ toggleNavbar , setToggleNavbar ] = useState(false)

  const handleNavbar = () => {
    setToggleNavbar(!toggleNavbar)
  }

  if(toggleNavbar) {
    return(
      <div className='navbar_item_container'>
        <NavLink className='navbar_item_icon' to="/" ><BookIconForNavbar /></NavLink>
        <NavLink className='navbar_item_icon' to="/" ><HomeIconForNavbar /></NavLink>
        <NavLink className='navbar_item_icon' to="/login" ><AdminIconForNavbar /></NavLink>
        <XIconForNavbar className='navbar_close' onClick={handleNavbar}/>
      </div>
    )
  }



  return (
    <div className='navbar_container'>
      <ThreeLineIconForNavbar className='navbar_icon' onClick={handleNavbar}/>
      {toggleNavbar && <NavbarItems />}
    </div>
  )
}

export default Navbar
