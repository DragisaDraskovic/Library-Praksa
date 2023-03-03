import React from 'react'

import Button from '../buttons/Button'
import Home from '../../assets/images/home.png'
import Person from '../../assets/images/person.png'
import './index.css'

const Footer = () => {
  return (
    <div className='buttons'>
      <Button name='Home' className='home'/>
      <Button name='Admin' className='admin'/>
    </div>
  )
}

export default Footer
