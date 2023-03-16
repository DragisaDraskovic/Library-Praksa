import axios, { AxiosResponse } from 'axios'


import TokenService from './TokenService'
import BookRequest from '../model/BookRequest'
import BookResponse from '../model/BookResponse'

const token = TokenService.getAccesToken()


const urlParams = (bookRequest: BookRequest) => {
  return `?PageNumber=${bookRequest.PageNumber.toString()}&PageLength=${bookRequest.PageLength.toString()}`
}
const getAllBooks = ( bookRequest : BookRequest) : Promise<AxiosResponse<BookResponse>> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const request = axios.get<BookResponse>(process.env.REACT_APP_BASE_URL + '/api/Books/paged' + urlParams(bookRequest), config)
  return request
}

const createBook = async (newBook : FormData) => {

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await axios.post(process.env.REACT_APP_BASE_URL + '/api/Books', newBook,  config )
  return response
}


export default { getAllBooks, createBook }
