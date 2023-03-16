import { useState } from 'react'

import BookList from '../bookList/BookList'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import ModalCreateBooks from '../modal/ModalCreateBooks'
import NavbarItems from '../navbarItems/NavbarItems'

import './MainPage.css'

const MainPage = () => {
  const [ modalIsOpen, setModalIsOpen ] = useState(false)


  const handleModalToggle = () => {
    setModalIsOpen(!modalIsOpen)
  }

  return (
    <div className='main_page_container'>
      <Header/>
      <NavbarItems setModalIsOpen={handleModalToggle}/>
      <BookList />
      { modalIsOpen && <ModalCreateBooks onClose={handleModalToggle}/>}
      <Footer setModalIsOpen={handleModalToggle}/>
    </div>
  )
}

export default MainPage
