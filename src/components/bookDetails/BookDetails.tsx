import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import './BookDetails.css'
import placeholderImg from '../../assets/placeholder/placeholderForBook.png'
import { BookDetailsRequest } from '../../model/BookRequest'
import BookService from '../../services/BookService'
import ModalForEdit from '../modalForEdit/ModalForEdit'
import { convertDateToString } from '../../utils/ConvertDate'
import RentalServices from '../../services/RentalServices'





const BookDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ isOpenEditModal, setIsOpenEditModal ] = useState(false)
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

  const handleDeleteBook = () => {
    BookService.deleteBook(bookDetails.Id)
      .then(() => {
        confirm('Are you sure to delete book?') &&
          navigate('/mainpage')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleEditBook = () => {
    setIsOpenEditModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenEditModal(false)
  }

  const handleRentBook = () => {
    console.log(bookDetails.Id)
    RentalServices.rentBook(bookDetails.Id)
      .then(() => {
        toast.success('Success rent book', {
          position: toast.POSITION.TOP_RIGHT
        })
      })
  }

  const handleReturnBook = () => {
    console.log('return')
  }

  return (
    <div className='container_for_details'>
      <div className='container_for_img'>
        <img className='card_img_for_book_details' src={bookDetails.Cover ? `data:image/png;base64, ${bookDetails.Cover}` : placeholderImg}/>
      </div>
      <div className='container_for_text'>
        <p>Title:</p>
        <p>{bookDetails.Title}</p>
        <p>Description:</p>
        <p>{bookDetails.Description}</p>
        <p>Isbn:</p>
        <p>{bookDetails.ISBN}</p>
        <p>Publish Date:</p>
        {bookDetails.PublishDate ? <p>{convertDateToString(bookDetails.PublishDate)} </p> : '' }
        <p>Authors:</p>
        {bookDetails.Authors &&
            bookDetails.Authors.map((author) => ( <p key={author.Id}>{author.Firstname} {author.Lastname} </p>))
        }
        <div className={bookDetails.Available > 0 ? 'container_for_available_green' : 'container_for_available_red'}>
          <p>Available:</p>
          {bookDetails.Available}
        </div>
      </div>
      <div className='container_for_button'>
        <button className='button_edit' onClick={handleEditBook}>Edit</button>
        <button className='button_delete' onClick={handleDeleteBook}>Delete</button>
        <button className='button_rent' onClick={handleRentBook}>Rent</button>
        <button className='button_return' onClick={handleReturnBook}>Return</button>
        <button className='button_back' onClick={handleBack}>Back</button>
      </div>
      { isOpenEditModal && <ModalForEdit onClose={handleCloseModal} bookId={Number(id)} />}
      <ToastContainer />
    </div>
  )
}

export default BookDetails
