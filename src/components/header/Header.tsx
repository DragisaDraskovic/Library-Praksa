
import React from 'react'

import { GrFilter } from 'react-icons/gr'
import { TbArrowsSort } from 'react-icons/tb'

import './Header.css'

const Header = () => {
  return (
    <div className='header_container'>
      <input className='header_input_search' placeholder='Search...'/>
      <GrFilter className='header_icon'/>
      <TbArrowsSort className='header_icon'/>
    </div>
  )
}
export default Header
