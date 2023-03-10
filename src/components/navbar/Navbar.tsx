
import { useState } from 'react'


import { MdOutlineMenu as ThreeLineIconForNavbar } from 'react-icons/md'

import './Navbar.css'
import NavbarItems from './navbarItems/NavbarItems'


const Navbar = () => {
  const [ toggleNavbar , setToggleNavbar ] = useState(false)

  const handleNavbar = () => {
    setToggleNavbar(!toggleNavbar)
  }

  return (
    <div className='navbar_container'>
      <ThreeLineIconForNavbar className='navbar_icon' onClick={handleNavbar}/> 
    </div>
  )
}

export default Navbar
