
import React from 'react'

import Footer from '../footer/Footer'
import Header from '../header/Header'
import Navbar from '../navbar/Navbar'

import './MainPage.css'

const MainPage = () => {
  return (
    <div className='main_page_container'>
      <Header />
      <Navbar />
      <Footer />
    </div>
  )
}

export default MainPage
