import axios from 'axios'

import { LoginResponse } from '../model/LoginResponse'


interface LoginCredentialsProps {
    email: string,
    password: string
}


const LoginService = async ({ email, password } : LoginCredentialsProps) => {
  return axios.post<LoginResponse>(process.env.REACT_APP_BASE_URL + '/api/Auth/login', { email, password })
}

const isLoggedIn = () => {
  return !!localStorage.getItem('userAccessToken')
}

export default { LoginService, isLoggedIn }
