import {  MouseEventHandler, useEffect, useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineLogin as LoginIcon, AiOutlineLogout as LogoutIcon ,AiOutlineHome as HomeIconForNavbar, AiOutlinePlusCircle as PlusIconForNavbar, AiOutlineStar as StarForNavbar } from 'react-icons/ai'
import jwtDecode from 'jwt-decode'

import './NavbarItems.css'
import TokenService from '../../services/TokenService'
import { isUserAdmin } from '../../utils/Roles'
import { roleKey, Jwt } from '../../model/JWT'

interface NavbarItemsProps {
  setModalIsOpen: MouseEventHandler<HTMLButtonElement>
  isLogged: boolean
  setShowMostRented: MouseEventHandler<HTMLButtonElement>
  showMostRented: boolean
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}

const NavbarItems = (props : NavbarItemsProps ) => {
  const [ isAdmin, setIsAdmin ] = useState(false)
  const navigateForLogout = useNavigate()
  const navigeteForLogin = useNavigate()


  useEffect(() => {
    const token = TokenService.getAccesToken()
    if(token) {
      setIsAdmin(isUserAdmin(jwtDecode<Jwt>(token)[roleKey]))
    }
  }, [])

  const handleLogout = () => {
    TokenService.deleteLocalStorage()
    navigateForLogout('/mainpage')
    props.setIsLogged(false)
  }

  const handleLogin = () => {
    navigeteForLogin('/login')
    props.setIsLogged(true)
  }

  return (
    <>
      {
        props.isLogged
          ?
          <div className='navbar_item_container'>
            { isAdmin && <button className='navbar_item_button' onClick={props.setModalIsOpen}><PlusIconForNavbar size='30px'/></button> }
            { props.showMostRented
              ?
              <button className='navbar_item_button' onClick={props.setShowMostRented} ><HomeIconForNavbar size='30px' /></button>
              :
              <button className='navbar_item_button' onClick={props.setShowMostRented}><StarForNavbar size='30px'/></button>
            }
            <button className='navbar_item_button_logout' onClick={handleLogout}><LogoutIcon size='30px' /></button>
          </div>
          :
          <div className='navbar_item_container'>
            <button className='navbar_item_button_login' onClick={handleLogin}><LoginIcon size='30px' /></button>

          </div>
      }
    </>
  )
}
export default NavbarItems
