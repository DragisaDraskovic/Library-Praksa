
import axios from 'axios'

const baseUrl = ''

interface LoginCredentialsProps {
    credentials: string
}


const LoginService = async ({ credentials } : LoginCredentialsProps) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default LoginService
