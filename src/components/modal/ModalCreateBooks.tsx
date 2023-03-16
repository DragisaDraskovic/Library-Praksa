import { FormEvent, useEffect, useState } from 'react'

import axios from 'axios'
import Select, { MultiValue } from 'react-select'
import ReactDOM from 'react-dom'
import './ModalCreateBooks.css'
import { GrClose as XIconForModal } from 'react-icons/gr'
import { BiBookAdd as BookAddIcon } from 'react-icons/bi'

import BookBody from '../../model/BookBody'
import BookService from '../../services/BookService'
import Author from '../../model/Author'
import AuthorService from '../../services/AuthorService'
import placeholder from '../../assets/placeholder/placeholderForBook.png'


interface Modal {
  open: boolean,
  onClose: () => void
}


const poratlDiv = document.getElementById('portal') as HTMLElement
const ModalCreateBooks = ({ open , onClose } : Modal) => {

  const [ showAddAuthor, setShowAddAuthor ] = useState(true)
  const [ showAddButton, setShowAddButton ] = useState(true)
  const [ authors, setAtuhors ] = useState([])
  const [ fileImg, setFileImg ] = useState<Blob>(new Blob())
  const [ coverImg, setCoverImg ] = useState('')
  const [ booksData, setBooksData ] = useState<BookBody>({
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
      if (files) {
        reader.readAsDataURL(files[0])
        setFileImg(files[0])
        reader.onloadend = function () {
          const base64data = reader.result
          if (base64data) setCoverImg(base64data as string)
        }
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
      booksData.AuthorIds.forEach((author) => form.append('AuthorsIds', author.Id.toString()))
      await BookService.createBook(form)
    } catch(error) {
      if(axios.isAxiosError(error)) {
        if(error.response?.status === 401) {
          console.log('Not authenticated')
        }
      }
    }
  }

  const handleCreateAuthor = async (event: FormEvent<HTMLFormElement>) => {
    handlerNewAuthor()
    event.preventDefault()
    try {
      const form = new FormData()
      form.append('FirstName', authorData.FirstName)
      form.append('LastName', authorData.LastName)
      await AuthorService.createAuthor(form)
    } catch(error) {
      if(axios.isAxiosError(error)) {
        if(error.response?.status === 400) {
          window.alert('Hello world!')
          console.log('Not authenticated')
        }
      }
    }
  }

  const handlerNewAuthor = () => {
    AuthorService.getAuthors().then((response) => {
      setAtuhors(response)
    })
    setShowAddAuthor(true)
    setShowAddButton(true)
  }

  const handlerCloseModal = () => {
    onClose()
  }

  const handleFormAuthor = () => {
    setShowAddAuthor(false)
    setShowAddButton(false)
  }

  const handleCloseFormAuthor = () => {
    setShowAddAuthor(true)
    setShowAddButton(true)
  }

  useEffect(() => {
    AuthorService.getAuthors()
      .then(response => {
        setAtuhors(response)
      })
  }, [])

  const handleAuthor = (newAuthors: MultiValue<Author>) => {
    setBooksData((prev) => ({ ...prev, AuthorIds: newAuthors as Author[] }))
  }

  if(!open) return null


  return ReactDOM.createPortal(
    <div className='overlay'>
      <div className='content'>
        <form className='form_for_modal' onSubmit={hanlderCreateBooks}>
          <div className='heder_modal'>
            <button type='button' onClick={handlerCloseModal} className='x_button_for_modal'><XIconForModal className='x_icon_for_modal'/></button>
          </div>
          <img className='modal_cover_img' src={coverImg ? coverImg : placeholder} />
          <div className='container_for_element'>
            <input type='text' className='input_for_title' placeholder='Title' onChange={({ target }) => setBooksData((prevTitle) => ({ ...prevTitle, Title: target.value }))}/>
          </div>
          <div className='container_for_element'>
            <input type='text' className='input_for_description' placeholder='Description' onChange={({ target }) => setBooksData((prevDescription) => ({ ...prevDescription, Description: target.value }))}/>
          </div>
          <div className='container_for_element'>
            <input type='text' className='input_for_isbn' placeholder='ISBN' pattern='^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$' onChange={({ target }) => setBooksData((prevIsbn) => ({ ...prevIsbn, Isbn: target.value }))}/>
          </div>
          <div className='container_for_element'>
            <input type='text' className='input_for_quantity' placeholder='Quantity' onChange={({ target }) => setBooksData((prevQuantity) => ({ ...prevQuantity, Quantity: +target.value }))}/>
          </div>
          <div className='container_for_element'>
            <input type='date' className='input_for_date' onChange={({ target }) => setBooksData((prevDate) => ({ ...prevDate, PublishDate: target.value }))}/>
          </div>
          <div className='container_for_element'>
            <input type='file' className='input_for_image' onChange={handleImgUpload}/>
          </div>
          <div className='container_for_element'>
            <Select name='authors' id='authors' className='select_for_authors' getOptionLabel={(author : Author) => `${author.FirstName} ${author.LastName}`} isMulti={true} getOptionValue={(option:Author) => option.Id.toString()} options={authors} onChange={handleAuthor} />
            <div className='add_book_button' >
              <button type='button' className={ showAddButton ? 'button_for_add_book' : 'hiden_add_button'} onClick={handleFormAuthor} >Add book <BookAddIcon/></button>
            </div>
            <div className='container_for_element'>
              <button type='submit' className={showAddAuthor ? 'submit_button_for_modal' : 'hidden_button_submit'}>Submit</button>
            </div>
          </div>
        </form>
        <form className={ showAddAuthor ? 'hiden_add_form' : 'add_author' } onSubmit={handleCreateAuthor}>
          <input type='text' className='input_for_author_firstname' required placeholder='Enter first name' onChange={({ target }) => setAuthorData((prevFirstName) => ({ ...prevFirstName, FirstName: target.value }))}/>
          <input type='text' className='input_for_author_lastname' required placeholder='Enter last name' onChange={({ target }) => setAuthorData(( prevLastName) => ({ ...prevLastName, LastName: target.value }))}/>
          <div className='container_for_author_button'>
            <button type='submit' className='button_for_add_author' onClick={handlerNewAuthor}>Add</button>
            <button type='button' onClick={handleCloseFormAuthor} className='button_for_close_author_form'>Close</button>
          </div>
        </form>
      </div>
    </div>
    ,
    poratlDiv
  )
}

export default ModalCreateBooks
