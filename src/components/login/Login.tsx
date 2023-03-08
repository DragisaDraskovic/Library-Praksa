
import React, { FormEvent } from 'react'

import './Login.css'

const Login = () => {

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
