/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState }  from 'react'

import { GrLogout as LogoutIcon } from 'react-icons/gr'


import './Header.css'

export interface Props {
  isLoggedIn: boolean,
}

const Header = ({ isLoggedIn } : Props) => {
  const [ showLoginIcon, setShowLoginIcon ] = useState(true)
  const path = window.location.pathname


  const handleLogout = () => {
    console.log('logout')
    localStorage.removeItem('userAccessToken')
    localStorage.removeItem('userRefreshToken')
    localStorage.removeItem('expire')
    console.log(localStorage.getItem('userAccessToken'))
  }

  return (
    <div className='header_container'>
      {showLoginIcon &&
      <div className='logutIcon'>
        <p onClick={handleLogout}>Logout <LogoutIcon/></p>
      </div>
      }
    </div>
  )
}
export default Header
