import React, { FormEvent, useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import LoginService from '../services/LoginService'
import setLocalStorage from '../services/TokenService'

import './Login.css'

// interface LoginProps {
//   setIsLoggedIn: boolean
// }

const Login = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ errorMessageForCredentials, setErrorMessageForCredentials ] = useState(false)
  const [ flagForUnsuccessLogin, setflagForUnsuccessLogin ] = useState(true)
  const [ flagForblurPassword, setFlagForBlurPassword ] = useState(false)
  const [ flagForBlurUsername, setFlagForBlurUsername ] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await LoginService.LoginService({ email: username, password })
      console.log(response)
      setLocalStorage.setLocalStorage(response.data)
      setUsername('')
      setPassword('')
      navigate('/home')
    } catch(error) {
      if(axios.isAxiosError(error)) {
        if(!error?.response) {
          console.log('No server response')
        } else if (error.response.status === 401) {
          setErrorMessageForCredentials(true)
        }
      }
    }
  }

  const handleBlurForPassword = () => {
    password.trim() === '' && setFlagForBlurPassword(true)
  }

  const handleBlurForUsername = () => {
    username.trim() === '' && setFlagForBlurUsername(true)
  }


  return (
    <div className='form_container'>
      <p className='wellcome_to_library'>Wellcome to library</p>
      {errorMessageForCredentials ? <h3 className='error_message_for_credentials'>Please enter correct username and password </h3> : <h2 className='title_login'>Login</h2>}
      <form className='form_input' onSubmit={handleLogin}>
        <div className={flagForBlurUsername ? 'blur_for_username_display' : 'blur_for_username_display_none'} >
          <h4>Please enter username </h4>
        </div>
        <input
          value={username}
          type='email'
          className='input_field'
          placeholder='Entrer username'
          required
          onChange={({ target }) => setUsername(target.value)}
          onBlur={handleBlurForUsername}
          onFocus={() => {setFlagForBlurUsername(false), setErrorMessageForCredentials(false)}}
        />
        <div className={flagForblurPassword ? 'blur_for_password_display' : 'blur_for_password_display_none'}>
          <h4>Please enter password</h4>
        </div>
        <input
          value={password}
          type='password'
          className='input_field'
          placeholder='Enter password'
          required
          onChange={({ target }) => setPassword(target.value)}
          onBlur={handleBlurForPassword}
          onFocus={() => {setFlagForBlurPassword(false), setErrorMessageForCredentials(false)}}
        />
        <div className={flagForUnsuccessLogin ? 'login_success' : 'error_message_for_login' }>
          <h3>Wrong email or password</h3>
        </div>
        <button type='submit' className='button_Submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
