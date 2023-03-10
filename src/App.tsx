
import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './index.css'
import MainPage from './components/mainPage/MainPage'
import Login from './components/login/Login'
import ProtectedRoute from './utils/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Login/>} />
        <Route path='/home' element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
