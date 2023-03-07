
import React from 'react'

import { MdHome } from 'react-icons/md'
import { BsFillPersonFill, BsThreeDots } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <NavLink className='footer_icon' to='/'><MdHome className='footer_icon'/> </NavLink>
      <NavLink className='footer_icon' to='/login'> <BsFillPersonFill className='footer_icon'/> </NavLink>
      <NavLink className='footer_icon' to='/more'><BsThreeDots className='footer_icon'/></NavLink>
    </div>
  )
}

export default Footer
