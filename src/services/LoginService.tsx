import axios from 'axios'

import { LoginResponse } from '../model/LoginResponse'


interface LoginCredentialsProps {
    Email: string,
    Password: string
}


const LoginService = async ({ Email, Password } : LoginCredentialsProps) => {
  return axios.post<LoginResponse>(process.env.REACT_APP_BASE_URL + '/api/Auth/login', { Email, Password })
}

const IsLoggedIn = () => {
  return !!localStorage.getItem('userAccessToken')
}

export default { LoginService, IsLoggedIn }
