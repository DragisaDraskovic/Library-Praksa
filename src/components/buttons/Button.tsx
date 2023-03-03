import React from 'react'

//import 'index.css'

interface ButtonProps {
    name: string
}


const Button: React.FC<ButtonProps> = ({
  name
}) => {

  return (
    <div>
      <button>
        {name}
      </button>
    </div>
  )
}

export default Button
