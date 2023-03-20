import axios from 'axios'

import { Author } from '../model/Author'
import config from '../utils/Config'
import AuthorRequest from '../model/AuthoRequest'

const getAuthors = () => {
  const request = axios.get<Author[]>(process.env.REACT_APP_BASE_URL + '/api/Authors', config)
  return request
}

const createAuthor = (newAuthor : AuthorRequest) => {
  const response = axios.post(process.env.REACT_APP_BASE_URL + '/api/Authors', newAuthor, config)
  return response
}

export default { getAuthors, createAuthor }
