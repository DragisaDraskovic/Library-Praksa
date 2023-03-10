import ReactDOM from 'react-dom'
import './ModalCreateBooks.css'
import { GrClose as XIconForModal } from 'react-icons/gr'


interface Modal {
  open: boolean,
  onClose: () => void
}


const poratlDiv = document.getElementById('portal') as HTMLElement
const ModalCreateBooks = ({ open , onClose } : Modal) => {

  const handlerCloseModal = () => {
    onClose()
  }

  const hanlderSubmit = () => {
    console.log('sumbit')
  }

  if(!open) return null

  return ReactDOM.createPortal(
    <div className='overlay'>
      <div className='content'>
        <form className='form_for_modal'>
          <div className='heder_modal'>
            <button type='button' onClick={handlerCloseModal} className='x_button_for_modal'><XIconForModal className='x_icon_for_modal'/></button>
          </div>
          <div className='container_for_element'>
            <input type='text' className='input_for_title' placeholder='Title'/>
          </div>
          <div className='container_for_element'>
            <input type='text' className='input_for_description' placeholder='Description'/>
          </div>
          <div className='container_for_element'>
            <input type='text' className='input_for_isbn' placeholder='ISBN'/>
          </div>
          <div className='container_for_element'>
            <input type='text' className='input_for_quantity' placeholder='Quantity' />
          </div>
          <div className='container_for_element'>
            <input type='date' className='input_for_date' />
          </div>
          <div className='container_for_element'>
            <input type='file' className='input_for_image'/>
          </div>
          <div className='container_for_element'>
            <select name='authors' className='select_for_authors'>
              <option>Author 1</option>
              <option>Author 2</option>
              <option>Author 3</option>
            </select>
            <div className='container_for_element'>
              <button className='submit_button_for_modal' onClick={hanlderSubmit}>Submit</button>
              {/* <button onClick={handlerCloseModal} className='x_button_for_modal'><XIconForModal className='x_icon_for_modal' /></button> */}

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
