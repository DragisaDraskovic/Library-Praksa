
import React, { FormEvent, useState } from 'react'
import LoginService from '../services/LoginService'

import './Login.css'

type Credentials = {
  usename: string
  password: string
}

const Login = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user , setUser ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState('')

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const user = await LoginService.LoginService({
        username: Credential, password: Credential,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exx)
    }
  }

  return (
    <div className='form_container'>
      <p className='wellcome_to_library'>Wellcome to library</p>
      <h2 className='title'>Login</h2>
      <form className='form_input' onSubmit={handleLogin}>
        <input type='email' className='input_field' placeholder='Entrer username' required/>
        <input type='password' className='input_field' placeholder='Enter password' required/>
        <button type='submit' className='button_Submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
