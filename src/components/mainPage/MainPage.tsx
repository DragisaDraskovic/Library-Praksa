import { useEffect, useState } from 'react'

import { ToastContainer } from 'react-toastify'

import TokenService from '../../services/TokenService'
import BookList from '../bookList/BookList'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import ModalCreateBooks from '../modal/ModalCreateBooks'
import NavbarItems from '../navbarItems/NavbarItems'
import 'react-toastify/dist/ReactToastify.css'
import './MainPage.css'
import MostRentedBooks from '../mostRentedBooks/MostRentedBooks'


const MainPage = () => {
  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  const [ showMostRented, setShowMostRented ] = useState(false)
  const [ isLogged, setIsLogged ] = useState(false)

  useEffect(() => {
    if(TokenService.getAccesToken()) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  },[])

  const handleModalToggle = () => {
    setModalIsOpen(!modalIsOpen)
  }

  const handleShowMostRented = () => {
    setShowMostRented(!showMostRented)
  }

  return (
    <div className='main_page_container'>
      <div className='main_page_container'>
        <Header />
        <NavbarItems isLogged={isLogged} setModalIsOpen={handleModalToggle} setShowMostRented={handleShowMostRented} setIsLogged={setIsLogged} showMostRented={showMostRented}/>
        { showMostRented ? <MostRentedBooks /> : <BookList />}
        { modalIsOpen && <ModalCreateBooks onClose={handleModalToggle}/>}
        <Footer setModalIsOpen={handleModalToggle} isLogged={isLogged} setShowMostRented={handleShowMostRented} setIsLogged={setIsLogged} showMostRented={showMostRented}/>
        <ToastContainer />
      </div>
    </div>
  )
}

export default MainPage
