
import React  from 'react'

import { GrFilter } from 'react-icons/gr'
import { TbArrowsSort } from 'react-icons/tb'
import { useLocation } from 'react-router-dom'

import './Header.css'

const Header = () => {
  const location = useLocation()
  const showSearchs = location.pathname === '/'

  return (
    <div className='header_container'>
      {showSearchs ?
        <>
          <input className='header_input_search' placeholder='Search...'/>
          <GrFilter className='header_icon'/>
          <TbArrowsSort className='header_icon'/>
        </>
        :
        <input className='header_search_visible' /> }
    </div>
  )
}
export default Header
