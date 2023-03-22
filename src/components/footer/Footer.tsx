import { MouseEventHandler, useEffect, useState } from 'react'


import { MdHome as HomeIcon } from 'react-icons/md'
import { AiOutlinePlusCircle as PlusIconForNavbar, AiOutlineStar as StarForNavbar, AiOutlineLogin as LoginIcon, AiOutlineLogout as LogoutIcon } from 'react-icons/ai'
import { NavLink, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import './Footer.css'
import TokenService from '../../services/TokenService'
import { isUserAdmin } from '../../utils/Roles'
import { Jwt, roleKey } from '../../model/JWT'


interface OpenModal {
  setModalIsOpen: MouseEventHandler<HTMLButtonElement>
  isLogged: boolean
  setShowMostRented: MouseEventHandler<HTMLButtonElement>
  showMostRented: boolean
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}

const Footer = (props: OpenModal) => {
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
    <>{
      props.isLogged
        ?
        <div className='footer'>
          { props.showMostRented
            ?
            <button className='button_home' onClick={props.setShowMostRented}> <HomeIcon size='30px'/> </button>
            :
            <button className='button_star' onClick={props.setShowMostRented}> <StarForNavbar size='30px'/> </button>
          }
          { isAdmin && <button className='button_footer' onClick={props.setModalIsOpen}><PlusIconForNavbar size='30px'/></button>}
          <button className='button_logout' onClick={handleLogout}><LogoutIcon size='30px' /></button>
        </div>
        :
        <div className='footer'>
          <button className='button_login' onClick={handleLogin}><LoginIcon size='30px' /></button>
        </div>
    }
    </>
  )
}

export default Footer
