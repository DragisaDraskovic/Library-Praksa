import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './index.css'
import Login from './components/login/Login'
import MainPage from './components/mainPage/MainPage'

function App() {



  return (
    <Router >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<MainPage /> } />
      </Routes>
    </Router>
  )
}

export default App
