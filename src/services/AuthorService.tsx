import axios from 'axios'

import Author from '../model/Author'
import TokenService from './TokenService'
import config from '../utils/Config'

const token = TokenService.getAccesToken()

const getAuthors = () => {
  const request = axios.get<Author[]>(process.env.REACT_APP_BASE_URL + '/api/Authors', config)
  return request
}

const createAuthor = (newAuthor : FormData) => {
  const configForCreateAuthror = {
    headers: {
      Authorization: `Bearer ${token}` ,
      'Content-Type': 'application/json'
    }
  }

  const response = axios.post(process.env.REACT_APP_BASE_URL + '/api/Authors', newAuthor, configForCreateAuthror)
  return response
}

export default { getAuthors, createAuthor }
