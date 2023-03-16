import axios, { AxiosResponse } from 'axios'

import TokenService from './TokenService'
import BookResponse from '../model/BookResponse'
import Where from '../model/Where'

const token = TokenService.getAccesToken()

interface GetBooksProps {
  pageNumber: number
  pageLength: number
  search: string
  filter: Where[]
  sort: string[]
}
const createSearch  = (search: string) => {
  return {
    Field: 'Title',
    Value: search,
    Operation: 2
  }
}

const urlParams = ({ pageNumber, pageLength, search, filter } : GetBooksProps) => {
  let result = '?'
  result += `PageNumber=${pageNumber.toString()}`
  result += `&PageLength=${pageLength.toString()}`
  const where: Where[] =[ ...filter ]
  where.push(createSearch(search))
  where.forEach((where) => {
    if(where.Value !== '' && where.Value !== null) {
      result += `&where=${JSON.stringify(where)}`
    }
  })
  return result
}
const getAllBooks = ({ pageNumber, pageLength, search, filter, sort } : GetBooksProps) : Promise<AxiosResponse<BookResponse>> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const request = axios.get<BookResponse>(process.env.REACT_APP_BASE_URL + '/api/Books/paged' + urlParams({ pageNumber, pageLength, search, filter, sort }), config)
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
