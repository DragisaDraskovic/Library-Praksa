import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
//import Card from './components/card/Card'
import Navbar from './components/navbar/Navbar'
import NavbarItems from './components/navbar/navbarItems/NavbarItems'
import MainPage from './components/mainPage/MainPage'
import routes from './route-config'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Navbar />
      <Routes>
        {routes.map(route => <Route key={route.path} path={route.path} element={<route.component />} />
        )}
      </Routes>
      {/* <MainPage /> */}
      <Footer/>
    </BrowserRouter>

  )
}

export default App
