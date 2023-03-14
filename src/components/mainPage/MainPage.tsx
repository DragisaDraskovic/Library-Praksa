import { useState } from 'react'

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

  // const handleModalClose = () => {
  //   setModalIsOpen(true)
  // }

  return (
    <div className='main_page_container'>
      <Header/>
      <NavbarItems setModalIsOpen={handleModalToggle}/>
      {modalIsOpen && (<ModalCreateBooks onClose={handleModalToggle}/> )}
      <Footer setModalIsOpen={handleModalToggle}/>
    </div>
  )
}

export default MainPage
