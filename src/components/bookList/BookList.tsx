import { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

import { Book } from '../../model/Book'
import BookRequest from '../../model/BookRequest'
import BookService from '../../services/BookService'
import Card from '../card/Card'
import './BookList.css'


const BookList = () => {
  const [ book, setBook ] = useState<Book[]>([])
  const [ hasMore, setHasMore ] = useState(true)
  const [ pageNubmer, setPageNumber ] = useState(1)

  const numberOfCard = 24
  useEffect(() => {
    getDataBooks()
  }, [ pageNubmer ])

  const nexPage = () => {
    setPageNumber( pageNubmer + 1)
  }

  const getDataBooks = async () => {
    const bookRequest : BookRequest = {
      PageNumber: pageNubmer,
      PageLength: numberOfCard
    }
    try{
      const response = await BookService.getAllBooks(bookRequest)
      setHasMore(pageNubmer * numberOfCard <= response.data.TotalCount)
      setBook([ ...book,...response.data.Items ])
    } catch(error) {
      console.error(error)
    }
  }
  return (
    <div>
      <InfiniteScroll
        dataLength={book.length}
        next={nexPage}
        hasMore={hasMore}
        loader={<h4 className='loading_message'>Loading...</h4>}
        endMessage={<b className='end_message'>You have seen all books :( ...</b>}
        scrollThreshold='75%'
      >
        <div className='container_for_bookList'>
          {book.map((booksData) => <Card key={booksData.Id} book={booksData} /> )}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default BookList
