import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './index.css'
import MainPage from './components/mainPage/MainPage'
import Login from './components/login/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Login/>} />
        <Route path='/home' element={<MainPage />} />
      </Routes>
    </Router>
  )
}

export default App
