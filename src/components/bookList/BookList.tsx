import { useEffect, useState } from 'react'

import  Book from '../../model/Book'
import BookService from '../../services/BookService'
import Card from '../card/Card'
import './BookList.css'


const BookList = () => {
  const [ book, setBook ] = useState<Book[]>([])

  useEffect(() => {
    dataBooks()
  }, [])

  const dataBooks = async () => {
    try{
      const response = await BookService.getAllBooks()
      setBook(response)
    } catch(error) {
      console.log(error)
    }
  }
  return (
    <div className='container_for_bookList'>
      {book.length === 0
        ?
        ( <h2 className='no_available_message'>No available books</h2> )
        :
        (book && book.map((books) => <Card key={books.Id} book={books} />)
        )}
    </div>
  )
}

export default BookList
