import React, { useEffect, useState } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './index.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Navbar from './components/navbar/Navbar'
import routes from './route-config'


function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('userAccessToken')) {
      console.log('useEfect', localStorage.getItem('userAccessToken'))
      setIsLoggedIn(true)
    }
  },[ isLoggedIn ])


  return (
    <Router >
      <Header isLoggedIn={isLoggedIn}/>
      <Navbar />
      <Routes>
        {routes.map(route => <Route key={route.path} path={route.path} element={<route.component />}/>
        )}
      </Routes>
      <Footer/>
    </Router>

  )
}

export default App
