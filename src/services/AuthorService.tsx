import axios from 'axios'


import TokenService from './TokenService'

const token = TokenService.getAccesToken(
)
const getAuthors = () => {

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const request = axios.get(process.env.REACT_APP_BASE_URL + '/api/Authors', config)
  return request.then(response => response.data)
}

export default { getAuthors }
