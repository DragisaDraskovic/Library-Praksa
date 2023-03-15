import axios from 'axios'

import TokenService from './TokenService'

const token = TokenService.getAccesToken()

const getAllBooks = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const request = axios.get(process.env.REACT_APP_BASE_URL + '/api/Books', config)
  return request
}

const createBook = (newBook : FormData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = axios.post(process.env.REACT_APP_BASE_URL + '/api/Books', newBook, config)
  return response
}


export default { getAllBooks, createBook }
