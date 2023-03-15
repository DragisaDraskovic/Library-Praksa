import { Navigate } from 'react-router-dom'

import LoginService from '../services/LoginService'


const ProtectedRoute = ({ children }: {children: JSX.Element} ) => {

  return !LoginService.IsLoggedIn() ? <Navigate to='/login' replace /> : children

}

export default ProtectedRoute
