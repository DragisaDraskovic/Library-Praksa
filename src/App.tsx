import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import './index.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
//import Card from './components/card/Card'
import Navbar from './components/navbar/Navbar'
import NavbarItems from './components/navbar/navbarItems/NavbarItems'
import MainPage from './components/mainPage/MainPage'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Navbar />
      <MainPage />
      <Footer/>
    </BrowserRouter>

  )
}

export default App
