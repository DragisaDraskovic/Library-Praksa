import { useEffect, useState } from 'react'

import BookBody from '../../model/Book'
import Card from '../card/Card'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import ModalCreateBooks from '../modal/ModalCreateBooks'
import NavbarItems from '../navbar/navbarItems/NavbarItems'

import './MainPage.css'

const MainPage = () => {
  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  // const [ books, setBooks ] = useState<BookBody[]>([
  //   {
  //     Id: 0,
  //     Title: '',
  //     Description: '',
  //     Isbn: '',
  //     Quantity: 0,
  //     Cover: ,
  //     Date: '',
  //     AuthorIds: []
  //   }
  // ])
  const handleModalOpen = () => {
    setModalIsOpen(false)
  }

  const handleModalClose = () => {
    console.log('close modal')
    setModalIsOpen(true)
  }

  // useEffect(() => {
  //   console.log('start feach')
  //   BookService.getAllBooks()
  //     .then(response => {
  //       setBooks(response)
  //     })
  // },[])


  return (
    <div className='main_page_container'>
      <Header />
      <NavbarItems setModalIsOpen={handleModalClose}/>
      <ModalCreateBooks open={modalIsOpen} onClose={handleModalOpen}/>
      {/* <Card book={books}/> */}
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Footer />
    </div>
  )
}

export default MainPage
