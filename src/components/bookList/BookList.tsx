import { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

import  Book from '../../model/Book'
import BookService from '../../services/BookService'
import Card from '../card/Card'
import './BookList.css'

const BookList = () => {
  const [ book, setBook ] = useState<Book[]>([])
  const [ hasMore, setHasMore ] = useState(true)
  const [ page, setPage ] = useState(1)

  useEffect(() => {
    dataBooks()
  }, [ ])

  const handler = () => {
    setPage(prev => prev + 1)
  }

  const dataBooks = async () => {
    try{
      const response = await BookService.getAllBooks()
      setBook(response)
    } catch(error) {
      console.log(error)
    }
  }
  return (
    <div>
      <InfiniteScroll
        dataLength={book.length}
        next={handler}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<b>You have seen all books</b>}
        scrollThreshold='75%'
      >
        <div className='container_for_bookList'>
          {book.length === 0
            ?
            ( <h2 className='no_available_message'>No available books</h2> )
            :
            (book && book.map((books) => <Card key={books.Id} book={books} />)
            )}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default BookList
