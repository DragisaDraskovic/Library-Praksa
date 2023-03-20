import axios, { AxiosResponse } from 'axios'

import TokenService from './TokenService'
import BookResponse from '../model/BookResponse'
import Where from '../model/Where'
import { BookDetailsRequest } from '../model/BookRequest'


const token = TokenService.getAccesToken()

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
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const request = axios.get<BookResponse>(process.env.REACT_APP_BASE_URL + '/api/Books/paged' + urlParams(getBookRequest), config)
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

const getBook = (id: number) : Promise<AxiosResponse<BookDetailsRequest>> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const respone = axios.get<BookDetailsRequest>(process.env.REACT_APP_BASE_URL + `/api/Books/${id}`, config)
  return respone
}

const deleteBook = (id: number) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.delete(process.env.REACT_APP_BASE_URL + `/api/Books/${id}`, config)
}

export default { getAllBooks, createBook, getBook, deleteBook }
