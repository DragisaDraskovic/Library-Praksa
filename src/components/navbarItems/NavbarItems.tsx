import {  MouseEventHandler, useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'
import { AiOutlineHome as HomeIconForNavbar, AiOutlinePlusCircle as PlusIconForNavbar } from 'react-icons/ai'
import { IoPersonOutline as AdminIconForNavbar } from 'react-icons/io5'
import jwtDecode from 'jwt-decode'

import './NavbarItems.css'
import TokenService from '../../services/TokenService'
import { isUserAdmin } from '../../utils/Roles'
import { roleKey, Jwt } from '../../model/JWT'

interface NavbarItemsProps {
  setModalIsOpen: MouseEventHandler<HTMLAnchorElement>
  isLogged: boolean
}

const NavbarItems = (props : NavbarItemsProps ) => {
  const [ isAdmin, setIsAdmin ] = useState(false)

  useEffect(() => {
    const token = TokenService.getAccesToken()
    if(token) {
      setIsAdmin(isUserAdmin(jwtDecode<Jwt>(token)[roleKey]))
    }
  }, [])
  return (
    <>
      {
        props.isLogged &&
    <div className='navbar_item_container'>
      { isAdmin && <NavLink className='navbar_item_icon' to="/" onClick={props.setModalIsOpen}><PlusIconForNavbar size='30px'/></NavLink> }
      <NavLink className='navbar_item_icon' to="/book" ><HomeIconForNavbar size='30px' /></NavLink>
      <NavLink className='navbar_item_icon' to="/login" ><AdminIconForNavbar size='30px' /></NavLink>
    </div>
      }
    </>
  )
}
export default NavbarItems
