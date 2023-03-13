import { FormEvent, useEffect, useState } from 'react'

import axios from 'axios'
import Select, { MultiValue } from 'react-select'
import ReactDOM from 'react-dom'
import './ModalCreateBooks.css'
import { GrClose as XIconForModal } from 'react-icons/gr'
import { BiBookAdd as BookAddIcon } from 'react-icons/bi'

import BookBody from '../../model/Book'
import BookService from '../../services/BookService'
import Author from '../../model/Author'
import AuthorService from '../../services/AuthorService'



interface Modal {
  open: boolean,
  onClose: () => void
}


const poratlDiv = document.getElementById('portal') as HTMLElement
const ModalCreateBooks = ({ open , onClose } : Modal) => {

  const [ showAddAuthor, setShowAddAuthor ] = useState(true)
  const [ authors, setAtuhors ] = useState([])
  const [ fileImg, setFileImg ] = useState<Blob>(new Blob())
  const [ coverImg, setCoverImg ] = useState('')
  const [ booksData, setBooksData ] = useState<BookBody>({
    Id: 0,
    Title: '',
    Description: '',
    Isbn: '',
    Quantity: 0,
    Cover: fileImg,
    PublishDate: '',
    AuthorIds: []
  })

  const handlerCloseModal = () => {
    onClose()
  }

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
    console.log(booksData)
    try {
      console.log(booksData.AuthorIds)
      const form = new FormData()
      form.append('Title', booksData.Title)
      form.append('Description', booksData.Description)
      form.append('Isbn', booksData.Isbn)
      form.append('Quantity', booksData.Quantity.toString())
      form.append('Cover', fileImg)
      form.append('PublishDate', booksData.PublishDate)
      booksData.AuthorIds.forEach((author) => form.append('AuthorIds', author.Id.toString()))
      await BookService.createBook(form)
    } catch(error) {
      if(axios.isAxiosError(error)) {
        if(error.response?.status === 401) {
          console.log('Not authenticated')
        } else if (error.response?.status === 403) {
          console.log('Not authorized')
        } else if (error.response?.status === 500) {
          console.log('Bad request')
        }
      }
    }
  }

  useEffect(() => {
    AuthorService.getAuthors()
      .then(response => {
        setAtuhors(response)
        console.log(response)
      })
  }, [])

  const handleAuthor = (newAuthors: MultiValue<Author>) => {
    console.log(newAuthors)
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
              <button className='button_for_add_book' onClick={() => setShowAddAuthor(false)} >Add book <BookAddIcon/></button>
            </div>
            <div className='container_for_element'>
              <button type='submit' className={showAddAuthor ? 'submit_button_for_modal' : 'hidden_button_submit'}>Submit</button>
            </div>
            <div className={ showAddAuthor ? 'hiden_add_form' : 'add_author' }>
              <input type='text' className='input_for_author_firstname' />
              <input type='text' className='input_for_author_lastname' />
              <button type='submit' className='button_for_add_author'>Add</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    ,
    poratlDiv
  )
}


export default ModalCreateBooks
