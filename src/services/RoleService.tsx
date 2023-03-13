import jwt_decoded from 'jwt-decode'

import TokenService from './TokenService'

interface Token {
    token: string
}

const token = TokenService.getAccesToken()

console.log(token)

//const decoded = jwt_decoded(token)

// console.log(decoded)
