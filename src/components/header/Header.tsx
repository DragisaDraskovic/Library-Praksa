
import React  from 'react'

import { GrFilter as FilterIcon } from 'react-icons/gr'
import { TbArrowsSort as SortIcon } from 'react-icons/tb'
import { useLocation } from 'react-router-dom'

import './Header.css'

const Header = () => {
  const locationPath = useLocation()
  const showSearchsInput = locationPath.pathname === '/'

  return (
    <div className='header_container'>
      {showSearchsInput ?
        <>
          <input className='header_input_search' placeholder='Search...'/>
          <FilterIcon className='header_icon'/>
          <SortIcon className='header_icon'/>
        </>
        :
        <input className='header_search_visible' /> }
    </div>
  )
}
export default Header
