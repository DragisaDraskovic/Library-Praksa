import axios from 'axios'

const getAllBooks = () => {
  const request = axios.get(process.env.REACT_APP_BASE_URL + '/api/Books')
  return request
}

const createBook = (newBook : FormData) => {
  const response = axios.post(process.env.REACT_APP_BASE_URL + '/api/Books', newBook)
  return response
}


export default { getAllBooks, createBook }
