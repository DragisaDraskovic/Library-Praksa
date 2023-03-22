
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './index.css'
import MainPage from './components/mainPage/MainPage'
import Login from './components/login/Login'
import BookDetails from './components/bookDetails/BookDetails'


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/mainpage' element={<MainPage/>} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<MainPage/>} />
        <Route path='/BookDetails/:id' element={<BookDetails/>} />
      </Routes>
    </Router>
  )
}

export default App
