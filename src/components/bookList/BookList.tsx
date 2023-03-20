import { useEffect, useState } from 'react'

import { AxiosResponse } from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Book } from '../../model/Book'
import BookService from '../../services/BookService'
import Card from '../card/Card'
import './BookList.css'
import Search from '../search/Search'
import BookResponse from '../../model/BookResponse'
import { BooksRequest } from '../../model/BookRequest'

const initialNumberCardForRendering = 6
const BookList = () => {
  const [ books, setBooks ] = useState<Book[]>([])
  const [ hasMore, setHasMore ] = useState(true)
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ searchValue, setSearchValue ] = useState('')
  const [ currentSearch, setCurrentSearch ] = useState<string>(searchValue)

  const nexPage = () => {
    setPageNumber(pageNumber => pageNumber + 1)
  }

  const getDataBooks = () => {
    const bookRequest : BooksRequest = {
      PageNumber: pageNumber,
      PageLength: initialNumberCardForRendering,
      Where: [ { Field: 'Title',Value: searchValue, Operation: 2 } ]
    }
    BookService.getAllBooks(bookRequest)
      .then((response:AxiosResponse<BookResponse>) => {
        const totalElements = response.data.TotalCount
        setHasMore(pageNumber * initialNumberCardForRendering <= totalElements)
        setBooks((books) => [ ...books,...response.data.Items ])
      })
      .catch((e) => console.error (e))
  }

  useEffect(() => {
    if(currentSearch !== searchValue) {
      setBooks([])
      setPageNumber(1)
      setCurrentSearch(searchValue)
    }
    getDataBooks()
  }, [ pageNumber, searchValue ])

  return (
    <div>
      <Search setSearchValue={setSearchValue} />
      <InfiniteScroll
        dataLength={books.length}
        next={nexPage}
        hasMore={hasMore}
        loader={<h4 className='loading_message'>Loading...</h4>}
        endMessage={<b className='end_message'>You have seen all books :( ...</b>}
      >
        <div className='container_for_bookList'>
          {books.map((booksData) => <Card key={booksData.Id} book={booksData} /> )}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default BookList
