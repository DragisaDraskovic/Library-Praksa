import React from 'react'

const ModalCreateAuthor = () => {
  return (
    <div>ModalCreateAuthor</div>
  )
}

export default ModalCreateAuthor

// import Select from 'react-select/dist/declarations/src/Select'

// const ModalCreateAuthor = ({ hanlderCreateBooks,handlerCloseModal }) => {
// const [ showModal, setShowModal ] = useState(false)

//   return (
//     <div className='overlay'>
//       <div className='content'>
//         <form className='form_for_modal' onSubmit={hanlderCreateBooks}>
//           <div className='heder_modal'>
//             <button type='button' onClick={handlerCloseModal} className='x_button_for_modal'><XIconForModal className='x_icon_for_modal'/></button>
//           </div>
//           <div className='container_for_element'>
//             <input type='text' className='input_for_title' placeholder='Title' onChange={({ target }) => setBooksData((prevTitle) => ({ ...prevTitle, Title: target.value }))}/>
//           </div>
//           <div className='container_for_element'>
//             <input type='text' className='input_for_description' placeholder='Description' onChange={({ target }) => setBooksData((prevDescription) => ({ ...prevDescription, Description: target.value }))}/>
//           </div>
//           <div className='container_for_element'>
//             <input type='text' className='input_for_isbn' placeholder='ISBN' pattern='^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$' onChange={({ target }) => setBooksData((prevIsbn) => ({ ...prevIsbn, Isbn: target.value }))}/>
//           </div>
//           <div className='container_for_element'>
//             <input type='text' className='input_for_quantity' placeholder='Quantity' onChange={({ target }) => setBooksData((prevQuantity) => ({ ...prevQuantity, Quantity: +target.value }))}/>
//           </div>
//           <div className='container_for_element'>
//             <input type='date' className='input_for_date' onChange={({ target }) => setBooksData((prevDate) => ({ ...prevDate, PublishDate: target.value }))}/>
//           </div>
//           <div className='container_for_element'>
//             <input type='file' className='input_for_image' onChange={handleImgUpload}/>
//           </div>
//           <div className='container_for_element'>
//             <Select name='authors' id='authors' className='select_for_authors' getOptionLabel={(author : Author) => `${author.FirstName} ${author.LastName}`} isMulti={true} getOptionValue={(option:Author) => option.Id.toString()} options={authors} onChange={handleAuthor} />
//             <div className='add_book_button' >
//               <button className='button_for_add_book' onClick={openModal}>Add book <BookAddIcon/></button>
//             </div>
//             <div className='container_for_element'>
//               <button type='submit' className='submit_button_for_modal'>Submit</button>

//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default ModalCreateAuthor
