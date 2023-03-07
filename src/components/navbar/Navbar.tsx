
import React, { useState } from 'react'


import { NavLink } from 'react-router-dom'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { AiOutlineHome } from 'react-icons/ai'
import { IoPersonOutline } from 'react-icons/io5'
import { GrClose } from 'react-icons/gr'
import { MdOutlineMenu } from 'react-icons/md'

import './Navbar.css'
import NavbarItems from './navbarItems/NavbarItems'


const Navbar = () => {
  const [ toggle , setToggle ] = useState(false)

  const handleNavbar = () => {
    setToggle(!toggle)
  }

  if(toggle) {
    return(
      <div className='navbaritem_container'>
        <NavLink className='navbaritem_icon' to="/login" ><HiOutlineBookOpen /></NavLink>
        <NavLink className='navbaritem_icon' to="/" ><AiOutlineHome /></NavLink>
        <NavLink className='navbaritem_icon' to="/Admin" ><IoPersonOutline /></NavLink>
        <GrClose className='navbar_close' onClick={handleNavbar}/>
      </div>
    )
  }

  return (
    <div className='navbar_container'>
      <MdOutlineMenu className='navbar_icon' onClick={handleNavbar}/>
      {toggle && <NavbarItems />}
    </div>
  )
}

export default Navbar
