import React from 'react'

import { GrLogout as LogoutIcon } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

import TokenService from '../../services/TokenService'


import './Header.css'

const Header = () => {
  const navigateForLogout = useNavigate()


  const handleLogout = () => {
    TokenService.deleteLocasStorage()
    navigateForLogout('/')
  }

  return (
    <div className='header_container'>
      <div className='logut_icon'>
        <p onClick={handleLogout}>Logout <LogoutIcon/></p>
      </div>
    </div>
  )
}
export default Header
