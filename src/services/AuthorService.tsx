import axios from 'axios'

import { Author } from '../model/Author'
import AuthorRequest from '../model/AuthorRequest'
import config from '../utils/Config'


const getAuthors = () => {
  const request = axios.get<Author[]>(process.env.REACT_APP_BASE_URL + '/api/Authors', config)
  return request
}

const createAuthor = (newAuthor : AuthorRequest) => {

  const response = axios.post(process.env.REACT_APP_BASE_URL + '/api/Authors', newAuthor, config)
  return response
}

export default { getAuthors, createAuthor }
