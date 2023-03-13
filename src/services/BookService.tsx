import axios from 'axios'


import TokenService from './TokenService'

const token = TokenService.getAccesToken()

const getAllBooks = () => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const request = axios.get(process.env.REACT_APP_BASE_URL + '/api/Books', config)
  return request.then(response => response.data)
}

const createBook = async (newBook : FormData) => {

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await axios.post(process.env.REACT_APP_BASE_URL + '/api/Books', newBook,  config )
  return response
}


export default { getAllBooks, createBook }
