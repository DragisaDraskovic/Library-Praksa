import { FormEvent, useEffect, useState } from 'react'

import axios from 'axios'
import ReactDOM from 'react-dom'
import { GrClose as XIconForModal } from 'react-icons/gr'

import { BookRequestForEdit } from '../../model/BookRequestEdit'
import BookService from '../../services/BookService'
import './ModalForEdit.css'
import Placeholder from '../../assets/placeholder/placeholderForBook.png'
import AuthorService from '../../services/AuthorService'
import { Author } from '../../model/Author'
import AuthorRequest from '../../model/AuthorRequest'
import { convertDateToString } from '../../utils/ConvertDate'



interface Modal {
    onClose: () => void
    bookId?: number
}

const poratlDiv = document.getElementById('portal') as HTMLElement
const ModalForEdit = ({ onClose, bookId } : Modal) => {
  const [ cover, setCover ] = useState(Placeholder)
  const [ authors, setAtuhors ] = useState<Author[]>([])
  const [ toggleAuthorForm ,setToggleAuthorForm ] = useState(false)
  const [ fileImg, setFileImg ] = useState<Blob>(new Blob())
  const [ bookForUpdate, setBookForUpdate ] = useState<BookRequestForEdit>({
    Id: 0,
    Title: '',
    Description: '',
    ISBN: '',
    Quantity: 0,
    Cover: fileImg,
    PublishDate: '',
    AuthorIds: []
 })

 const [ authorData, setAuthorData ] = useState<AuthorRequest>({
    FirstName: '',
    LastName: ''
  })

 const handleImgUpload = ({ currentTarget }: FormEvent<HTMLInputElement>) => {
    if (currentTarget.files) {
      const files = currentTarget.files
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      setFileImg(files[0])
      reader.onloadend = function () {
        const base64data = reader.result
        if (base64data) setCover(base64data as string)
      }
    }
  }

  useEffect(() => {
    if(bookId) {
      BookService.getBook(bookId)
        .then((response) => {
          setBookForUpdate({
            Id: bookId,
            Title: response.data.Title,
            Description: response.data.Description,
            ISBN: response.data.ISBN,
            Quantity: response.data.Quantity,
            PublishDate: response.data.PublishDate.toString(),
            Cover: fileImg,
            AuthorIds: []
          })
        })
    }
  })

  const handleUpdateBook = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const form = new FormData()
      form.append('Id', bookForUpdate.Id.toString())
      form.append('Title', bookForUpdate.Title)
      form.append('Description', bookForUpdate.Description)
      form.append('Isbn', bookForUpdate.ISBN)
      form.append('Quantity', bookForUpdate.Quantity.toString())
      form.append('Cover', fileImg)
      form.append('PublishDate', bookForUpdate.PublishDate)
      bookForUpdate.AuthorIds.forEach((author) => form.append('AuthorIds', author.Id.toString()))
      await BookService.updateBook(form)
      onClose()
    } catch (error) {
      if(axios.isAxiosError(error)) {
        if(error.response?.status === 401) {
          alert('Not authenticated')
        } else if (error.response?.status === 403) {
          alert('Not authorized')
        }
      }
    }
}

  const fatchNewAuthor = () => {
    AuthorService.getAuthors().then((response) => {
      setAtuhors(response.data)
    })
  }

  return ReactDOM.createPortal(
    <div className='overlay'>
      <div className='content'>
        <form className='form_for_modal'>
          <div className='heder_modal'>
            <button
              type='button'
              onClick={() => onClose()}
              className='x_button_for_modal'
            >
              <XIconForModal className='x_icon_for_modal'/>
            </button>
          </div>
          <img className='modal_cover_img' src={cover ? cover : Placeholder}/>
          <div className='container_for_element'>
            <input
              type='text'
              className='input_for_title'
              placeholder='Title'
              value={bookForUpdate.Title}
              onChange={({ target }) => setBookForUpdate((prevTitle) => ({ ...prevTitle, Title: target.value }))}
            />
          </div>
          <div className='container_for_element'>
            <input
              type='text'
              className='input_for_description'
              placeholder='Description'
              value={bookForUpdate.Description}
              onChange={({ target }) => setBookForUpdate((prevDescription) => ({ ...prevDescription, Description: target.value }))}
            />
          </div>
          <div className='container_for_element'>
            <input
              type='text'
              className='input_for_isbn'
              placeholder='ISBN'
              pattern='^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$'
              value={bookForUpdate.ISBN}
              onChange={({ target }) => setBookForUpdate((prevIsbn) => ({ ...prevIsbn, Isbn: target.value }))}
            />
          </div>
          <div className='container_for_element'>
            <input
              type='text'
              className='input_for_quantity'
              placeholder='Quantity'
              value={bookForUpdate.Quantity}
              onChange={({ target }) => setBookForUpdate((prevQuantity) => ({ ...prevQuantity, Quantity: +target.value }))}
            />
          </div>
          <div className='container_for_element'>
            <input
              type='date'
              className='input_for_date'
              defaultValue={convertDateToString(bookForUpdate.PublishDate, 'yyyy-MM-dd')}
              onChange={({ target }) => setBookForUpdate((prevDate) => ({ ...prevDate, PublishDate: target.value }))}
            />
          </div>
          <div className='container_for_element'>
            <input type='file' className='input_for_image' onChange={handleImgUpload} />
          </div>
          <div className='container_for_element'>
            {/* <Select
            //   name='authors'
            //   id='authors'
            //   className='select_for_authors'
            //   //getOptionLabel={}
            //   isMulti
            //  // getOptionValue={}
            //   options={}
            //   onChange={}
            /> */}
            <div className='add_book_button' >
              <button
                type='button'
                onClick={() => setToggleAuthorForm(false)}
              >
                Add book
              </button>
            </div>
            <div className='container_for_element'>
              <button type='submit' >Submit</button>
            </div>
          </div>
        </form>
        <form >
          <input
            type='text'
            className='input_for_author_firstname'
            required placeholder='Enter first name'
            onChange={({ target }) => setAuthorData((prevFirstName) => ({ ...prevFirstName, FirstName: target.value }))}
          />
          <input
            type='text'
            className='input_for_author_lastname'
            required
            placeholder='Enter last name'
            onChange={({ target }) => setAuthorData(( prevLastName) => ({ ...prevLastName, LastName: target.value }))}
          />
          <div className='container_for_author_button'>
            <button type='submit' className='button_for_add_author' onClick={fatchNewAuthor}>Add</button>
            <button type='button' onClick={() => setToggleAuthorForm(true)} className='button_for_close_author_form'>Close</button>
          </div>
        </form>
      </div>
    </div>
    ,
    poratlDiv
  )
}

export default ModalForEdit
