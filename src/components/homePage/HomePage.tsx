import { useEffect, useState } from 'react'

import './HomePage.css'

import BookService from '../../services/BookService'
import BookBody from '../../model/Book'
import Header from '../header/Header'
import ModalCreateBooks from '../modal/ModalCreateBooks'


const HomePage = () => {
  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  // const [ books, setBooks ] = useState<BookBody[]>([
  //   {
  //     Id: 0,
  //     Title: '',
  //     Description: '',
  //     Isbn: '',
  //     Quantity: 0,
  //     Cover: '',
  //     Date: '',
  //     AuthorIds: []
  //   }
  // ])

  const handleModalOpen = () => {
    setModalIsOpen(false)
  }

  // const handleModalClose = () => {
  //   console.log('close modal')
  //   setModalIsOpen(true)
  // }

  //   useEffect(() => {
  //     getBooks()

  //   }, [])
  //   const getBooks = async () => {
  //     try {
  //       const response = await BookService.getAllBooks()
  //       setBooks(response.data)
  //       return response
  //     } catch(error) {
  //       if(axios.isAxiosError(error)) {
  //         if(error?.response?.status === 401) {
  //           console.log(error)
  //         }
  //       }
  //     }
  // useEffect(() => {
  //   console.log('start feach')
  //   BookService.getAllBooks()
  //     .then(response => {
  //       setBooks(response)})
    // .catch(error) {
    //     console.log(error)
    //   if(axios.isAxiosError(error)){
    //     if(error?.response?.status === 401) {
    //       setError(true)
    //     }
    //   }
  // }
  // , [])
  return (
    <div className='container_for_homepage'>
      <Header />
      {/* <NavbarItems setModalIsOpen={handleModalClose}/> */}
      {/* {books.map((book) => (<Card key={book.Id} book={book} />))} */}
      {/* <ModalCreateBooks open={modalIsOpen} onClose={handleModalOpen}/> */}
    </div>
  )
}


export default HomePage
