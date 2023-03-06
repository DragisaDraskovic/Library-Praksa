import React, { useState } from 'react'

import { VscThreeBars } from 'react-icons/vsc'
import { GrUserAdmin } from 'react-icons/gr'

import './Navbar.css'
import NavbarItems from './navbarItems/NavbarItems'


const Navbar = () => {
  const [ toggle , setToggle ] = useState(false)

  const handleNavbar = () => {
    setToggle(!toggle)
}

  return (
    <div className='navbar_container'>
      <VscThreeBars className='navbar_icon' onClick={handleNavbar}/>
      {toggle && <NavbarItems />}
    </div>
  )
}

export default Navbar
