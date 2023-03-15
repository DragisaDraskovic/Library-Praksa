import axios from 'axios'

import Author from '../model/Author'
import TokenService from './TokenService'

const token = TokenService.getAccesToken()

const getAuthors = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const request = axios.get<Author[]>(process.env.REACT_APP_BASE_URL + '/api/Authors', config)
  return request
}

const createAuthor = (newAuthor : FormData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}` ,
      'Content-Type': 'application/json'
    }
  }

  const response = axios.post(process.env.REACT_APP_BASE_URL + '/api/Authors', newAuthor, config)
  return response
}

export default { getAuthors, createAuthor }
