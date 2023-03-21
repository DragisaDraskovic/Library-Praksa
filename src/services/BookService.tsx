import axios, { AxiosResponse } from 'axios'


import BookResponse from '../model/BookResponse'
import Where from '../model/Where'
import config from '../utils/Config'
import { BookDetailsRequest } from '../model/BookRequest'


interface GetBooksProps {
  PageNumber: number,
  PageLength: number,
  Where: Where[],
}


// const urlParams = ( getBookRequest : GetBooksProps) => {
//   let result = '?'
//   result += `PageNumber=${getBookRequest.PageNumber.toString()}`
//   result += `&PageLength=${getBookRequest.PageLength.toString()}`
//   getBookRequest.Where?.forEach((where) => {
//     if(where.Value !== '' && where.Value != null) {
//       result += `&where=${JSON.stringify(where)}`
//     }
//   })
//   return result
// }

const getAllBooks = ( getBookRequest : GetBooksProps) : Promise<AxiosResponse<BookResponse>> => {
  const request = axios.get<BookResponse>(process.env.REACT_APP_BASE_URL + '/api/Books/paged', { ...config, params: {
    PageNumber: getBookRequest.PageNumber,
    PageLenght: getBookRequest.PageLength
  } })
  return request
}

const createBook = (newBook : FormData) => {
  const response = axios.post(process.env.REACT_APP_BASE_URL + '/api/Books', newBook, config)
  return response
}

const getBook = (id: number) : Promise<AxiosResponse<BookDetailsRequest>> => {
  const respone = axios.get<BookDetailsRequest>(process.env.REACT_APP_BASE_URL + `/api/Books/${id}`, config)
  return respone
}

const deleteBook = (id: number) => {
  return axios.delete(process.env.REACT_APP_BASE_URL + `/api/Books/${id}`, config)
}

const updateBook = (updateData: FormData) => {
  return axios.put(process.env.REACT_APP_BASE_URL + '/api/books', updateData, config)
}

export default { getAllBooks, createBook, getBook, deleteBook, updateBook }
