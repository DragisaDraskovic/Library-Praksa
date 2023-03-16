import { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

import { Book } from '../../model/Book'
import BookRequest from '../../model/BookRequest'
import BookService from '../../services/BookService'
import Card from '../card/Card'
import './BookList.css'
import Search from '../search/Search'
import Where from '../../model/Where'


// interface BooksProps {
//   pageNumber: number,
//   pageLength: number,
//   search: string
//   filter: Where[]
//   sort: string[]
// }

//Move to model
interface Pagination {
  size: number,
  page: number,
  totalElements: number | null
}

const initalPagination: Pagination = {
  size: 20,
  page: 1,
  totalElements: null
}

const BookList = () => {
  const [ book, setBook ] = useState<Book[]>([])
  const [ hasMore, setHasMore ] = useState(true)
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ pagination , setPagination] = useState<Pagination>(initalPagination);
  const [ searchInput, setSearchInput ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ filter, setFilter ] = useState<Where[]>([])
  const [ sort, setSort ] = useState<string[]>([])

  const nexPage = () => {
    setPageNumber( pageNumber + 1)
  }

  const dataBooks = ( searchValue: string ) => {
      const response = BookService.getAllBooks({ pageNumber: pagination.size, pageLength: pagination.page, search: searchValue, })
      .then((response) => {
        const totalElements = response.data.TotalCount;
        setHasMore(pageNumber * totalElements <= totalElements)
        setBook(() => [ ...book,...response.data.Items ])
        setPagination((prevState) => { return { ...prevState, totalElements: totalElements }})
      })
      .catch((e) => console.log(e))
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
      <Search dataBooks={dataBooks} />
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
