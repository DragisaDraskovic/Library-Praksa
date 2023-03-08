import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Navbar from './components/navbar/Navbar'
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
      <Footer/>
    </BrowserRouter>

  )
}

export default App
