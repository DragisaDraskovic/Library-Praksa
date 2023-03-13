import BookBody from '../../model/Book'
import './Card.css'

interface Book {
  book: BookBody
}

// const Card = ({ book } : Book) => {
const Card = () => {
  return (
    <div className='card_container'>
      <div className='card_title'>
        <p>Title</p>
      </div>
      <div className='card_img'>
        {/* <img className='card_img' src={`data: image/png;base64, ${book.Cover}`} /> */}
        <img className='card_img' src='https://images.unsplash.com/photo-1536323760109-ca8c07450053' />
      </div>
      <div className='card_titles'>
        {/* <p>Authors: {book.Author.map((author) => (<p key={author.id}>{author.firstname}{author.lastname}</p>))}</p> */}
        { /*<p>Details: {book.Description}</p> */}
        <p>Authors:</p>
        <p>Details</p>
      </div>
    </div>
  )
}

export default Card
