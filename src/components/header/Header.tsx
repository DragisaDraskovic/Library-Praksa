import { useEffect, useState } from 'react'

import { GrLogout as LogoutIcon } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

import TokenService from '../../services/TokenService'


import './Header.css'

interface HeaderProps {
  isLogged: boolean
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ( { isLogged, setIsLogged } : HeaderProps) => {
  const navigateForLogout = useNavigate()
  const navigeteForLogin = useNavigate()


  const handleLogout = () => {
    TokenService.deleteLocalStorage()
    navigateForLogout('/mainpage')
    setIsLogged(false)
  }

  const handleLogin = () => {
    navigeteForLogin('/login')
    setIsLogged(true)
  }

  return (
    <>
    {isLogged
     ?
      <div className='header_container'>
        <button className='logout_button' onClick={handleLogout}>Logout <LogoutIcon/></button>
      </div>
    :
      <div className='header_container'>
        <button className='login_button' onClick={handleLogin}>Login <LogoutIcon/></button>
      </div>
  }
    </>
  )
}
export default Header
