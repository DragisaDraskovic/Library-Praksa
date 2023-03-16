import { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

import { Book } from '../../model/Book'
import BookRequest from '../../model/BookRequest'
import BookService from '../../services/BookService'
import Card from '../card/Card'
import './BookList.css'
import Search from '../search/Search'
import Where from '../../model/Where'


interface BooksProps {
  PageNumber: number,
  PageLength: number,
  Search: string
  Filter: Where[]
  Sort: string[]
}

const BookList = () => {
  const [ book, setBook ] = useState<Book[]>([])
  const [ hasMore, setHasMore ] = useState(true)
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ searchInput, setSearchInput ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ filter, setFilter ] = useState<Where[]>([])
  const [ sort, setSort ] = useState<string[]>([])
  const numberCard = 12

  const nexPage = () => {
    setPageNumber( pageNumber + 1)
  }

  const dataBooks = async (
    pageNumber: number,
    pageLength: number,
    search: string,
    filter: Where[],
    sort: string[]
  ) => {
    try{
      const response = await BookService.getAllBooks({ pageNumber, pageLength, search, filter, sort })
      setHasMore(pageNumber * numberCard <= response.data.TotalCount)
      setBook(() => [ ...book,...response.data.Items ])
    } catch(error) {
      //console.error(error)
      setBook([])
    }
  }

  const refreshPage = () => {
    setBook([])
    setPageNumber(1)
  }

  useEffect(() => {
    if(search !== searchInput) {
      setSearch(searchInput)
      refreshPage()
    }

    // if(search !== searchInput) {
    //   setBook([])
    //   setPageNumber(1)
    //   setSearch(searchInput)
    // }
    dataBooks(pageNumber, numberCard, search, filter, sort)
  }, [ pageNumber, searchInput ]
  )
  return (
    <div>
      <Search setSearchValue={setSearchInput}/>
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
