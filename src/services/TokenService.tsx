import { LoginResponse } from '../model/LoginResponse'

const userAccesTokenKey = 'userAccessToken'
const userRefrestTokenKey = 'userRefreshToken'
const tokenExpireKey = 'expire'

const setLocalStorage = (response : LoginResponse) => {
  localStorage.setItem(userAccesTokenKey,response.accessToken)
  localStorage.setItem(userRefrestTokenKey, response.refreshToken)
  localStorage.setItem(tokenExpireKey, response.expiration)
}

const deleteLocasStorage = () => {
  localStorage.removeItem(userAccesTokenKey)
  localStorage.removeItem(userRefrestTokenKey)
  localStorage.removeItem(tokenExpireKey)
}

export default { setLocalStorage, deleteLocasStorage }
