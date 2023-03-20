import axios, { AxiosResponse } from 'axios'

import BookResponse from '../model/BookResponse'
import Where from '../model/Where'
import config from '../utils/Config'


interface GetBooksProps {
  PageNumber: number,
  PageLength: number,
  Where: Where[],
}


const urlParams = ( getBookRequest : GetBooksProps) => {
  let result = '?'
  result += `PageNumber=${getBookRequest.PageNumber.toString()}`
  result += `&PageLength=${getBookRequest.PageLength.toString()}`
  getBookRequest.Where?.forEach((where) => {
    if(where.Value !== '' && where.Value != null) {
      result += `&where=${JSON.stringify(where)}`
    }
  })
  return result
}

const getAllBooks = ( getBookRequest : GetBooksProps) : Promise<AxiosResponse<BookResponse>> => {

  const request = axios.get<BookResponse>(process.env.REACT_APP_BASE_URL + '/api/Books/paged' + urlParams(getBookRequest), config)
  return request
}

const createBook = (newBook : FormData) => {

  const response = axios.post(process.env.REACT_APP_BASE_URL + '/api/Books', newBook, config)
  return response
}


export default { getAllBooks, createBook }
