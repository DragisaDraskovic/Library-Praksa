import { LoginResponse } from '../model/LoginResponse'

const userAccesTokenKey = 'userAccessToken'
const userRefrestTokenKey = 'userRefreshToken'
const tokenExpireKey = 'expire'

const setLocalStorage = (response : LoginResponse) => {
  localStorage.setItem(userAccesTokenKey,response.AccessToken)
  localStorage.setItem(userRefrestTokenKey, response.RefreshToken)
  localStorage.setItem(tokenExpireKey, response.Expiration)
}

const deleteLocalStorage = () => {
  localStorage.removeItem(userAccesTokenKey)
  localStorage.removeItem(userRefrestTokenKey)
  localStorage.removeItem(tokenExpireKey)
}

const getAccesToken = () => {
  return localStorage.getItem(userAccesTokenKey)
}

export default { setLocalStorage, deleteLocalStorage, getAccesToken }
