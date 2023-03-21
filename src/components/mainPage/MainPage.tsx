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


const MainPage = () => {
  const [ modalIsOpen, setModalIsOpen ] = useState(false)

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

  return (
    <div className='main_page_container'>
      <Header isLogged={isLogged} setIsLogged={setIsLogged}/>
      <NavbarItems isLogged={isLogged} setModalIsOpen={handleModalToggle}/>
      <BookList />
      { modalIsOpen && <ModalCreateBooks onClose={handleModalToggle}/>}
      <Footer setModalIsOpen={handleModalToggle}/>
      <ToastContainer />
    </div>
  )
}

export default MainPage
