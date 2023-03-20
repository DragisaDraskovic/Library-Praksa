import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { TfiBackLeft as IconForBack } from 'react-icons/tfi'

import './BookDetails.css'
import placeholderImg from '../../assets/placeholder/placeholderForBook.png'
import { BookDetailsRequest } from '../../model/BookRequest'
import BookService from '../../services/BookService'
import { covnertDateToString } from '../../utils/ConvertDate'
import ModalCreateBooks from '../modal/ModalCreateBooks'





const BookDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [ bookDetails, setBookDetails ] = useState<BookDetailsRequest>(
    {
      Id: 0,
      Title: '',
      Authors: [],
      Cover: '',
      Available: 0,
      Description: '',
      ISBN: '',
      PublishDate: '',
      Quantity: 0
    }
  )

  useEffect(() => {
    getBook()
  }, [ ])

  const getBook = () => {
    if(!id) return
    BookService.getBook(parseInt(id)).then((response) => {
      setBookDetails(response.data)
    }).catch((error) => console.error(error))
  }

  const handleBack = () => {
    navigate('/mainpage')
  }

  return (
    <div className='container_for_details'>
      <button className='button_back' onClick={handleBack}><IconForBack/></button>
      <div className='container_for_img'>
        <img className='card_img_for_book_details' src={bookDetails.Cover ? `data:image/png;base64, ${bookDetails.Cover}` : placeholderImg}/>
        <div className='container_for_text'>
          <p>Title:</p>
          <p>{bookDetails.Title}</p>
          <p>Description:</p>
          <p>{bookDetails.Description}</p>
          <p>Isbn:</p>
          <p>{bookDetails.ISBN}</p>
          <p>Publish Date:</p>
          {bookDetails.PublishDate ? <p>{covnertDateToString(bookDetails.PublishDate)} </p> : '' }
          <p>Authors:</p>
          {bookDetails.Authors &&
          bookDetails.Authors.map((author) => ( <p key={author.Id}>{author.Firstname} {author.Lastname} </p>))
          }
          <div className='container_for_quantity'>
            <p>Available {bookDetails.Quantity} books</p>
          </div>
        </div>
      </div>
      <div className='container_for_button'>
        <button className='button_edit'>Edit</button>
        <button className='button_delete'>Delete</button>
        <button className='button_rent'>Rent</button>
      </div>
    </div>
  )
}

export default BookDetails
