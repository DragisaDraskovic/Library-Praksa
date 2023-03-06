import React from 'react'

import { Link, BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import { BsPersonCircle } from 'react-icons/bs'
import { MdHome } from 'react-icons/md'

import Login from '../Login/Login'
//import Button from '../buttons/Button'

import './index.css'

const Footer = () => {
  return (
    <Router>
      <div className='buttons'>
        {/* <Button name='Home' className='home'/>
        <Button name='Admin' className='admin'/> */}
        <Link to="/home"><h2>  home </h2></Link>
        <Link to="/login"><h2> login</h2></Link>
      </div>
      <Routes>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </Router>
  )
}

export default Footer
