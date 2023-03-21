import axios from 'axios'

import config from '../utils/Config'

interface PropsReturn {
  bookId: number,
  userId: number
}

const rentBook = (id: number) => {
  const response = axios.post(process.env.REACT_APP_BASE_URL + `/api/Rental/rent/${id}`, null,  config)
  return response
}

const returnBook = (props : PropsReturn) => {
  const response = axios.post(process.env.REACT_APP_BASE_URL + `/api/Rental/return/${props.bookId}/${props.userId}`, config)
  return response
}

export default { rentBook, returnBook }
