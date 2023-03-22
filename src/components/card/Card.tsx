import { useNavigate } from 'react-router-dom'

import { Book } from '../../model/Book'
import './Card.css'
import placeholderImg from '../../assets/placeholder/placeholderForBook.png'
import { MostRented } from '../../model/MostRentedBooksResponse'


interface CardProps {
  book?: Book
  mostRented?: MostRented
}

const Card = ({ book, mostRented } : CardProps) => {
  const navigate = useNavigate()
  return (
    <>
      { book
    &&
    <div className='card_container' onClick={() => navigate(`/BookDetails/${book.Id}`)}>
      <img className='card_img' src={book.Cover ? `data: image/png;base64, ${book.Cover}` : placeholderImg} />
      <div className='card_title'>
        <p>{book.Title}</p>
      </div>
      <div className='card_description'>
        <p>{book.Description?.substring(0,30)}</p>
      </div>
      <div className='card_author'>
        {book.Authors &&
        book.Authors.map((author) => (
          <p className='p_author' key={author.Id}> {author.FirstName} {author.LastName}</p>
        ))}
      </div>
    </div> }
      { mostRented
    &&
    <div className='card_container' onClick={() => navigate(`/BookDetails/${mostRented.Id}`)}>
      <img className='card_img' src={mostRented.Cover ? `data: image/png;base64, ${mostRented.Cover}` : placeholderImg} />
      <div className='card_title'>
        <p>{mostRented.Title}</p>
      </div>
      <div className='card_description'>
        <p>{mostRented.Description?.substring(0,30)}</p>
      </div>
    </div>
      }
    </>
  )
}

export default Card
