import React from 'react'

import './App.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'

function App() {
  return (
    <div className='App'>
      <div className='header'>
        <Header/>
      </div>
      <div className='footer'>
        <Footer/>
      </div>
    </div>
  )
}

export default App
