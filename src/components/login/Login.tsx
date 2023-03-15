import { FormEvent, useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import LoginService from '../../services/LoginService'
import setLocalStorage from '../../services/TokenService'

import './Login.css'

const Login = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ flagForEmptyCredentials, setFlagForEmptyCredentials ] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(password.trim() !== '' || username.trim() !== '') {
      try {
        const response = await LoginService.LoginService({ Email: username, Password: password })
        setLocalStorage.setLocalStorage(response.data)
        setUsername('')
        setPassword('')
        navigate('/')
      } catch(error) {
        if(axios.isAxiosError(error)) {
          if(error?.response?.status === 401) {
            setFlagForEmptyCredentials(true)
            setUsername('')
            setPassword('')
          }
        }
      }
    } else {
      setFlagForEmptyCredentials(true)
    }
  }

  return (
    <div className='form_container'>
      <p className='wellcome_to_library'>Welcome to library</p>
      { !flagForEmptyCredentials && <h2 className='title_login'>Login</h2> }
      <form className='form_input' onSubmit={handleLogin}>
        <input
          value={username}
          type='email'
          className='input_field'
          placeholder='Enter username'
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          value={password}
          type='password'
          className='input_field'
          placeholder='Enter password'
          onChange={({ target }) => setPassword(target.value)}
        />
        {flagForEmptyCredentials && <h3 className='error_message_for_credentials'>Please enter correct username and password </h3>}
        <button type='submit' className='button_Submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
