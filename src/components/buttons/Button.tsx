import React from 'react'

import './index.css'

interface ButtonProps {
    name: string
    className?: string
}



const Button = ({ name, className = '' }: ButtonProps) => {

  return (
    <div>
      <button className={className}>
        {name}
      </button>
    </div>
  )
}

export default Button
