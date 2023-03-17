import { FormEvent, useEffect, useState } from 'react'

import axios from 'axios'
import Select, { MultiValue } from 'react-select'
import ReactDOM from 'react-dom'
import './ModalCreateBooks.css'
import { GrClose as XIconForModal } from 'react-icons/gr'
import { BiBookAdd as BookAddIcon } from 'react-icons/bi'

import BookService from '../../services/BookService'
import Author from '../../model/Author'
import AuthorService from '../../services/AuthorService'
import placeholder from '../../assets/placeholder/placeholderForBook.png'
import { BookRequest } from '../../model/Book'

interface Modal {
  onClose: () => void
}


const poratlDiv = document.getElementById('portal') as HTMLElement
const ModalCreateBooks = ({ onClose } : Modal) => {
  const [ toggleAuthorForm , setToggleAuthorForm ] = useState(true)
  const [ authors, setAtuhors ] = useState<Author[]>([])
  const [ fileImg, setFileImg ] = useState<Blob>(new Blob())
  const [ coverImg, setCoverImg ] = useState('')
  const [ booksData, setBooksData ] = useState<BookRequest>({
    Title: '',
    Description: '',
    Isbn: '',
    Quantity: 0,
    Cover: fileImg,
    PublishDate: '',
    AuthorIds: []
  })

  const [ authorData, setAuthorData ] = useState<Author>({
    Id: 0,
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
        if (base64data) setCoverImg(base64data as string)
      }
    }
  }
  const hanlderCreateBooks = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const form = new FormData()
      form.append('Title', booksData.Title)
      form.append('Description', booksData.Description)
      form.append('Isbn', booksData.Isbn)
      form.append('Quantity', booksData.Quantity.toString())
      form.append('Cover', fileImg)
      form.append('PublishDate', booksData.PublishDate)
      booksData.AuthorIds.forEach((author) => form.append('AuthorIds', author.Id.toString()))
      await BookService.createBook(form)
      onClose()
    } catch(error) {
      if(axios.isAxiosError(error)) {
        if(error.response?.status === 401) {
          console.error(error)
        }
      }
    }
  }

  const handleCreateAuthor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const form = new FormData()
      form.append('FirstName', authorData.FirstName)
      form.append('LastName', authorData.LastName)
      await AuthorService.createAuthor(form)
      fatchNewAuthor()
      setToggleAuthorForm(true)
    } catch(error) {
      if(axios.isAxiosError(error)) {
        if(error.response?.status === 401) {
          console.error(error)
        }
      }
    }
  }

  const fatchNewAuthor = () => {
    AuthorService.getAuthors().then((response) => {
      setAtuhors(response.data)
    })
  }

  useEffect(() => {
    AuthorService.getAuthors()
      .then(response => {
        setAtuhors(response.data)
      })
  }, [])

  const handleAuthorChange = (newAuthors: MultiValue<Author>) => {
    setBooksData((prev) => ({ ...prev, AuthorIds: newAuthors as Author[] }))
  }

  return ReactDOM.createPortal(
    <div className='overlay'>
      <div className='content'>
        <form className='form_for_modal' onSubmit={hanlderCreateBooks}>
          <div className='heder_modal'>
            <button
              type='button'
              onClick={() => onClose()}
              className='x_button_for_modal'
            >
              <XIconForModal className='x_icon_for_modal'/>
            </button>
          </div>
          <img className='modal_cover_img' src={coverImg ? coverImg : placeholder} />
          <div className='container_for_element'>
            <input
              type='text'
              className='input_for_title'
              placeholder='Title'
              onChange={({ target }) => setBooksData((prevTitle) => ({ ...prevTitle, Title: target.value }))}
            />
          </div>
          <div className='container_for_element'>
            <input
              type='text'
              className='input_for_description'
              placeholder='Description'
              onChange={({ target }) => setBooksData((prevDescription) => ({ ...prevDescription, Description: target.value }))}
            />
          </div>
          <div className='container_for_element'>
            <input
              type='text'
              className='input_for_isbn'
              placeholder='ISBN'
              pattern='^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$'
              onChange={({ target }) => setBooksData((prevIsbn) => ({ ...prevIsbn, Isbn: target.value }))}
            />
          </div>
          <div className='container_for_element'>
            <input
              type='text'
              className='input_for_quantity'
              placeholder='Quantity'
              onChange={({ target }) => setBooksData((prevQuantity) => ({ ...prevQuantity, Quantity: +target.value }))}
            />
          </div>
          <div className='container_for_element'>
            <input
              type='date'
              className='input_for_date'
              onChange={({ target }) => setBooksData((prevDate) => ({ ...prevDate, PublishDate: target.value }))}
            />
          </div>
          <div className='container_for_element'>
            <input type='file' className='input_for_image' onChange={handleImgUpload}/>
          </div>
          <div className='container_for_element'>
            <Select
              name='authors'
              id='authors'
              className='select_for_authors'
              getOptionLabel={(author : Author) => `${author.FirstName} ${author.LastName}`}
              isMulti
              getOptionValue={(option:Author) => option.Id.toString()}
              options={authors}
              onChange={handleAuthorChange}
            />
            <div className='add_book_button' >
              <button
                type='button'
                className={ toggleAuthorForm ? 'button_for_add_book' : 'hiden_add_button'}
                onClick={() => setToggleAuthorForm(false)}
              >
                Add book <BookAddIcon/>
              </button>
            </div>
            <div className='container_for_element'>
              <button type='submit' className={toggleAuthorForm ? 'submit_button_for_modal' : 'hidden_button_submit'}>Submit</button>
            </div>
          </div>
        </form>
        <form className={ toggleAuthorForm ? 'hiden_add_form' : 'add_author' } onSubmit={handleCreateAuthor}>
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

export default ModalCreateBooks
