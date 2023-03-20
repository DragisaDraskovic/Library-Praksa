import TokenService from '../services/TokenService'

const token = TokenService.getAccesToken()


const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

export default config
