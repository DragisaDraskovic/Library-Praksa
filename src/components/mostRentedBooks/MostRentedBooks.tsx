import { useEffect, useState } from 'react'

import RentalServices from '../../services/RentalServices'
import './MostRentedBooks.css'
import { MostRented } from '../../model/MostRentedBooksResponse'
import Card from '../card/Card'

const MostRentedBooks = () => {
  const [ mostRentedBooks, setMostRentedBooks ] = useState<MostRented[]>([])
  console.log(mostRentedBooks)

  const getMostRented = () => {
    RentalServices.getMostRented(10).then((response) => {
      setMostRentedBooks(response.data)
    })
  }

  useEffect(() => {
    getMostRented()
  })
  return (
    <>
      <div className='container_for_title'>
        <p className='p_tag_for_most_render'>MOST RENDER BOOKS</p>
      </div>
      <div className='container_for_most_rented'>
        {mostRentedBooks.map((books) => <Card key={books.Id} mostRented={books}/>)}
      </div>
    </>
  )
}

export default MostRentedBooks
