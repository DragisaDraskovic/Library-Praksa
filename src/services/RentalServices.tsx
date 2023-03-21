import axios from 'axios'

import config from '../utils/Config'


const rentBook = (id: number) => {
  const response = axios.post(process.env.REACT_APP_BASE_URL + `/api/Rental/rent/${id}`, null,  config)
  return response
}

export default { rentBook }
