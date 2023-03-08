
import axios from 'axios'

import { LoginResponse } from '../../model/LoginResponse'

const baseUrl = 'https://library-practice-app.azurewebsites.net'

interface LoginCredentialsProps {
    email: string,
    password: string
}


const LoginService = async ({ email, password } : LoginCredentialsProps) => {
  return axios.post<LoginResponse>(baseUrl + '/api/Auth/login', { email, password })
}

const isLoggedIn = () => {
  return !!localStorage.getItem('userAccessToken')
}

export default { LoginService }
