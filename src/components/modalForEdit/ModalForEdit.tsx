import { FormEvent, useEffect, useState } from 'react'

import Select ,{ MultiValue } from 'react-select'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { GrClose as XIconForModal } from 'react-icons/gr'
import { BiBookAdd as BookAddIcon } from 'react-icons/bi'

import { BookRequestForEdit } from '../../model/BookRequestEdit'
import BookService from '../../services/BookService'
import './ModalForEdit.css'
import Placeholder from '../../assets/placeholder/placeholderForBook.png'
import AuthorService from '../../services/AuthorService'
import AuthorRequest from '../../model/AuthorRequest'
import AuthorResponse from '../../model/AuthorResponse'

interface Modal {
    onClose: () => void
    bookId?: number
}
const poratlDiv = document.getElementById('portal') as HTMLElement
const ModalForEdit = ({ onClose, bookId } : Modal) => {
  const [ authorList, setAuthorList ] = useState<AuthorResponse[]>([])
  const [ selectedAuthors, setSelectedAuthors ] = useState<AuthorResponse[]>([])
  const [ isAuthorsChanged, setIsAuthorsChanged ] = useState(false)
  const [ cover, setCover ] = useState(Placeholder)
  const [ toggleAuthorForm ,setToggleAuthorForm ] = useState(true)
  const [ fileImg, setFileImg ] = useState<Blob>(new Blob())
  const [ bookForUpdate, setBookForUpdate ] = useState<BookRequestForEdit>({
    Id: 0,
    Title: '',
    Description: '',
    ISBN: '',
    Quantity: 0,
    PublishDate: '',
    AuthorIds: []
  })

  const [ authorData, setAuthorData ] = useState<AuthorRequest>({
    FirstName: '',
    LastName: ''
  })

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
            Cover: response.data.Cover,
            AuthorIds: response.data.Authors.map((author) => author.Id)
          })
          const selectedAuthors : AuthorResponse[] = []
          response.data.Authors.forEach(author =>
            selectedAuthors.push({
              Id: author.Id,
              FirstName: author.Firstname,
              LastName: author.Lastname
            }))
          setSelectedAuthors(selectedAuthors)
          if(response.data.Cover) {
            setCover('data:image/png;base64,' + response.data.Cover)
            setFileImg(convertBase64ToBlob('data:image/png;base64,' + response.data.Cover))
          }
        }).catch(error => alert(error))
    }
    fatchNewAuthor
  }, [ isAuthorsChanged ])

  useEffect(() => {
    fatchNewAuthor()
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
      form.append('PublishDate', new Intl.DateTimeFormat('en-US').format(new Date(bookForUpdate.PublishDate)))
      selectedAuthors.forEach(author => form.append('AuthorIds', author.Id.toString()))
      await BookService.updateBook(form)
      onClose()
      window.location.reload();
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
  const handleCreateAuthor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await AuthorService.createAuthor(authorData)
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
      setAuthorList(response.data)
    })
  }

  const handleSelectedAuthorsChange = (authorsData: MultiValue<AuthorResponse>) => {
    setSelectedAuthors(authorsData as AuthorResponse[])
  }

  const convertBase64ToBlob = (base64Image: string): Blob => {
    const parts = base64Image.split(';base64,')
    const imageType = parts[0].split(':')[1]
    const decodedData = window.atob(parts[1])
    const uInt8Array = new Uint8Array(decodedData.length)
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    return new Blob([ uInt8Array ], { type: imageType })
  }
  return ReactDOM.createPortal(
    <div className='overlay'>
      <div className='content'>
        <form className='form_for_modal' onSubmit={handleUpdateBook}>
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
              onChange={({ target }) => setBookForUpdate((prevIsbn) => ({ ...prevIsbn, ISBN: target.value }))}
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
              value={bookForUpdate.PublishDate ? new Intl.DateTimeFormat('en-CA').format(new Date(bookForUpdate.PublishDate)) : ''}
              onChange={({ target }) => setBookForUpdate((prevDate) => ({ ...prevDate, PublishDate: target.value }))}
            />
          </div>
          <div className='container_for_element'>
            <input type='file' className='input_for_image' onChange={handleImgUpload} />
          </div>
          <div className='container_for_element'>
            <Select
              name='authors'
              id='authors'
              className='select_for_authors'
              getOptionLabel={(author : AuthorResponse) => `${author.FirstName} ${author.LastName}`}
              isMulti
              getOptionValue={(author : AuthorResponse) => author.Id.toString()}
              options={authorList}
              onChange={handleSelectedAuthorsChange}
              value={selectedAuthors}
            />
            <div className='add_book_button' >
              <button
                type='button'
                onClick={() => setToggleAuthorForm(false)}
                className={ toggleAuthorForm ? 'button_for_add_book' : 'hiden_add_button'}
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

export default ModalForEdit
