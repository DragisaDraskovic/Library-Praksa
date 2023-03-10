
import React from 'react'

import './Card.css'

interface Card {
  authors?: string,
  details?: string
}

const Card = ({ authors, details } : Card) => {
  return (
    <div className='card_container'>
      <div className='card_img'>
        <img className='card_img' src='https://images.unsplash.com/photo-1536323760109-ca8c07450053' />
      </div>
      <div className='card_titles'>
        <p>Authors: {authors}</p>
        <p>Details: {details}</p>
      </div>
    </div>
  )
}

export default Card
