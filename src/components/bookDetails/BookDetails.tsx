import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import jwtDecode from 'jwt-decode'

import './BookDetails.css'
import placeholderImg from '../../assets/placeholder/placeholderForBook.png'
import { BookDetailsRequest } from '../../model/BookRequest'
import BookService from '../../services/BookService'
import { convertDateToString } from '../../utils/ConvertDate'
import RentalServices from '../../services/RentalServices'
import { RentBookHistory } from '../../model/Rent'
import TokenService from '../../services/TokenService'
import { isUserRegularUser } from '../../utils/Roles'
import { Jwt, roleKey } from '../../model/JWT'
import ModalForEdit from '../modalForEdit/ModalForEdit'





const BookDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ isOpenEditModal, setIsOpenEditModal ] = useState(false)
  const [ isUser, setIsUser ] = useState(false)
  const [ rentalBooksHistory, setRentalBooksHistory ] = useState<RentBookHistory[]>([])
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
    getHistoryBooks()
  }, [ ])

  const getBook = () => {
    if(!id) return
    BookService.getBook(parseInt(id)).then((response) => {
      setBookDetails(response.data)
    }).catch((error) => console.error(error))
  }

  const getHistoryBooks = () => {
    RentalServices.getBookHistory(Number(id))
      .then((response) => {
        setRentalBooksHistory(response.data)
      }
      )
  }

  const handleBack = () => {
    navigate('/mainpage')
  }

  const handleDeleteBook = () => {
    if(confirm('Are you sure to delete book?')) {
      toast.success(`Success delete ${bookDetails.Title} book`)
      BookService.deleteBook(bookDetails.Id)
        .then(() => {
          navigate('/mainpage')
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }


  useEffect(() => {
    const token = TokenService.getAccesToken()
    if(token) {
      setIsUser(isUserRegularUser(jwtDecode<Jwt>(token)[roleKey]))
    }
  }, [])

  const handleEditBook = () => {
    setIsOpenEditModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenEditModal(false)
  }

  const handleRentBook = () => {
    RentalServices.rentBook(bookDetails.Id)
      .then(() => {
        toast.success('Success rent book', {
          position: toast.POSITION.TOP_RIGHT
        })
        getBook()
        getHistoryBooks()
      })
  }

  const handleReturnBook = (id: number) => {
    RentalServices.returnBook(id).then(() => {
      toast.success(`${bookDetails.Title} has been returned`)
      getHistoryBooks()
      getBook()
    })
  }


  return (
    <>
      <div className='container_for_details'>
        <div className='container_for_img'>
          <img className='card_img_for_book_details' src={bookDetails.Cover ? `data:image/png;base64, ${bookDetails.Cover}` : placeholderImg}/>
          <div className={bookDetails.Available > 0 ? 'container_for_available_green' : 'container_for_available_red'}>
            <p>Available:</p>
            {bookDetails.Available}
          </div>
        </div>
        <div className='container_for_text'>
          <div className='title_container'>
            <h4>Title:</h4>
            <p>{bookDetails.Title}</p>
          </div>
          <div className='isbn_container'>
            <h4>Isbn:</h4>
            <p>{bookDetails.ISBN}</p>
          </div>
          <div className='date_container'>
            <h4>Publish Date:</h4>
            {bookDetails.PublishDate ? <p>{convertDateToString(bookDetails.PublishDate)} </p> : '' }
          </div>
          <div className='description_container'>
            <h4>Description:</h4>
            <p>{bookDetails.Description.substring(0,30)}</p>
          </div>
          <h4>Authors:</h4>
          <div className='container_author'>
            {bookDetails.Authors &&
            bookDetails.Authors.map((author) => ( <p key={author.Id} className='p_tag_for_author'>{author.Firstname} {author.Lastname} </p>))
            }
          </div>
        </div>
        { !isUser
          ?
          <div className='container_for_button'>
            <button className='button_edit' onClick={handleEditBook}>Edit</button>
            <button className='button_delete' onClick={handleDeleteBook}>Delete</button>
            <button className='button_rent' onClick={handleRentBook}>Rent</button>
            <button className='button_back' onClick={handleBack}>Back</button>
          </div>
          :
          <div className='container_for_button_user'>
            <button className='button_rent' onClick={handleRentBook}>Rent</button>
            <button className='button_back' onClick={handleBack}>Back</button>
          </div>
        }
        { isOpenEditModal && <ModalForEdit onClose={handleCloseModal} bookId={Number(id)} />}
        <ToastContainer />
      </div>
      { !isUser
      &&
      <div className='container_for_table'>
        <table className='table_container'>
          <thead>
            <tr>
              <th>Rent date</th>
              <th>Is returned</th>
              <th>User Email</th>
            </tr>
          </thead>
          <tbody>
            {rentalBooksHistory.map(( book ) => {
              return(
                <tr key={book.Id}>
                  <td>{convertDateToString(book.RentDate)}</td>
                  <td>{book.IsReturned ? 'yes' : <button className='return_button' onClick={() => {handleReturnBook(book.Id)}}>Return</button>}</td>
                  <td>{book.User.Email}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      }
    </>
  )
}

export default BookDetails
