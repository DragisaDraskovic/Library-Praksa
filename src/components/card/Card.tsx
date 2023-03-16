import { useEffect, useState } from 'react'

import { Book } from '../../model/Book'
import './Card.css'
import placeholderImg from '../../assets/placeholder/placeholderForBook.png'

interface Books {
  book: Book
}

const Card = ({ book } : Books) => {
  const [ placeholder , setPlaceholder ] = useState('')

  useEffect(() => {
    setPlaceholder(placeholderImg)
  },[])
  return (
    <div className='card_container'>
      <img className='card_img' src={book.Cover ? `data: image/png;base64, ${book.Cover}` : placeholder} />
      <div className='card_title'>
        <p>{book.Title}</p>
      </div>
      <div className='card_titles'>
        <p>{book.Description?.substring(0,30)}</p>
      </div>
      <div className='card_author'>
        {book.Authors &&
        book.Authors.map((authors) => (
          <p key={authors.Id}> {authors.FirstName} {authors.LastName}</p>
        ))}
      </div>
      <div className='button_for_card'>
        <button className='edit_button_for_card'>Edit</button>
        <button className='delete_button_for_card'> Delete</button>
        <button className='rent_button_for_card'>Rent</button>
      </div>
    </div>
  )
}

export default Card
