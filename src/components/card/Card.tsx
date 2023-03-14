import { useEffect, useState } from 'react'

import BookBody from '../../model/Book'
import './Card.css'
import placeholderImg from '../../assets/placeholder/placeholderForBook.png'

interface Book {
  book: BookBody
}

const Card = ({ book } : Book) => {
  const [ placeholder , setPlaceholder ] = useState('')

  useEffect(() => {
    setPlaceholder(placeholderImg)
  },[])
  return (
    <div className='card_container'>
      <div className='card_img'>
        <img className='card_img' src={book.Cover ? `data: image/png;base64, ${book.Cover}` : placeholder} />
      </div>
      <div className='card_title'>
        <p>{book.Title}</p>
      </div>
      <div className='card_titles'>
        <p>{book.Description}</p>
        {book.AuthorIds &&
        book.AuthorIds.map((authors) => (
          <p key={authors.Id}> {authors.FirstName} {authors.LastName}</p>
        ))}
      </div>
    </div>
  )
}

export default Card
