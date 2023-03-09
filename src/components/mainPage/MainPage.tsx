
import React from 'react'

import Card from '../card/Card'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Navbar from '../navbar/Navbar'

import './MainPage.css'

const MainPage = () => {
  return (
    <div className='main_page_container'>
      <Header />
      <Card authors='Mesa Selimovic, Ivo Andric, Agata Kristi, Jovan Ducic, Aleksa Santic, Vladislav Petkovic Dis' details='Domaci pisci, Klasicna, Lektira, jos nesto'/>
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
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Navbar />
      <Footer />
    </div>
  )
}

export default MainPage
