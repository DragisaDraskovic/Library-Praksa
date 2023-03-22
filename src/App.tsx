
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './index.css'
import MainPage from './components/mainPage/MainPage'
import Login from './components/login/Login'
import BookDetails from './components/bookDetails/BookDetails'
import ProtectedRoute from './utils/ProtectedRoute'



function App() {

  return (
    <Router>
      <Routes>
        <Route path='/mainpage' element={<MainPage/>} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<MainPage/>} />
        <Route path='/BookDetails/:id' element={<ProtectedRoute><BookDetails /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
