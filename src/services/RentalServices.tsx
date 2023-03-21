import axios from 'axios'

import config from '../utils/Config'



const rentBook = (bookId: number) => {
  const response = axios.post(process.env.REACT_APP_BASE_URL + `/api/Rental/rent/${bookId}`, null,  config)
  return response
}

const returnBook = (bookId : number) => {
  const response = axios.post(process.env.REACT_APP_BASE_URL + `/api/Rental/return/${bookId}`, null, config)
  return response
}

const getBookHistory = (bookId: number) => {
  const response = axios.get(process.env.REACT_APP_BASE_URL + `/api/Rental/book-history/${bookId}`,config)
  return response
}

export default { rentBook, returnBook, getBookHistory }
