
import React from 'react'

import './Login.css'

// const Login = ({
//   handleSubmit,
//     handleUsernameChange,
//     handlePasswordChange,
//     username,
//     password
// }) => {

const Login = () => {

  const handleLogin = (event : any) => {
    event.preventDefault()
    console.log('login')
  }

  return (
    <div className='form_container'>
      <p className='wellcome_to_library'>Wellcome to library</p>
      <h2 className='title'>Login</h2>
      <form className='form_input' onSubmit={handleLogin}>
          {/* <input value={username} onChange={handleUsernameChange} /> */}
          <input className='input_field' placeholder='Entrer username'/>
          {/* <input type='password' value={password} onChange={handlePasswordChange} /> */}
          <input className='input_field' placeholder='Enter password'/>
        <button type='submit' className='btnSubmit'>Login</button>
      </form>
    </div>
  )
}

export default Login
