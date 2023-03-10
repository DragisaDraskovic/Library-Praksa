import { FormEvent, useState } from 'react'

import Footer from '../footer/Footer'
import Header from '../header/Header'
import ModalCreateBooks from '../modal/ModalCreateBooks'
import NavbarItems from '../navbar/navbarItems/NavbarItems'

import './MainPage.css'

const MainPage = () => {
  const [ modalIsOpen, setModalIsOpen ] = useState(false)

  const handleModalOpen = () => {
    setModalIsOpen(false)
  }

  const handleModalClose = () => {
    console.log('close modal')
    setModalIsOpen(true)
  }

  return (
    <div className='main_page_container'>
      <Header />
      <NavbarItems setModalIsOpen={handleModalClose}/>
      <ModalCreateBooks open={modalIsOpen} onClose={handleModalOpen}/>
      <Footer />
    </div>
  )
}

export default MainPage
