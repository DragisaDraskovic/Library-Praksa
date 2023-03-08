
import React from 'react'

import { MdHome as HomeIcon } from 'react-icons/md'
import { BsFillPersonFill as AdminIconForFooter, BsThreeDots as ThreeDotsIconForFooter } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <NavLink className='footer_icon' to='/home'><HomeIcon className='footer_icon'/> </NavLink>
      <NavLink className='footer_icon' to='/login'> <AdminIconForFooter className='footer_icon'/> </NavLink>
      <NavLink className='footer_icon' to='/more'><ThreeDotsIconForFooter className='footer_icon'/></NavLink>
    </div>
  )
}

export default Footer
