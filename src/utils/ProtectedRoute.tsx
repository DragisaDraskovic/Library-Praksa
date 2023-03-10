
import React from 'react'

import { Navigate } from 'react-router-dom'

import LoginService from '../services/LoginService'


const ProtectedRoute = ({ children }: {children: JSX.Element} ) => {

  !LoginService.isLoggedIn()
  if(!LoginService.isLoggedIn()) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default ProtectedRoute
