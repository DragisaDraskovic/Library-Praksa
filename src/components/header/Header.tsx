import React from 'react'

import { GrLogout as LogoutIcon } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

import TokenService from '../../services/TokenService'


import './Header.css'

const Header = () => {
  const navigateForLogout = useNavigate()


  const handleLogout = () => {
    TokenService.deleteLocalStorage()
    navigateForLogout('/')
  }

  return (
    <div className='header_container'>
      <button className='logout_button' onClick={handleLogout}>Logout <LogoutIcon/></button>
    </div>
  )
}
export default Header
