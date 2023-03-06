import React from 'react'

import { MdHome } from 'react-icons/md'
import { BsFillPersonFill, BsThreeDots } from 'react-icons/bs'
//import Button from '../buttons/Button'

import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <p> <MdHome className='footer_icon'/> </p>
      <p> <BsFillPersonFill className='footer_icon'/> </p>
      <p> <BsThreeDots className='footer_icon'/></p>
    </div>
  )
}

export default Footer
