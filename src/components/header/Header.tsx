import React from 'react'

import './index.css'

const Header = () => {
  return (
    <div className='header'>
      <input className='input_search' placeholder='Search...'/>
      <div>
        <button className='btnHeader'> Meni</button>
      </div>
    </div>
  )
}
export default Header
