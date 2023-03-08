import MainPage from './components/mainPage/MainPage'
import Login from './components/login/Login'


const routes = [
  { path: '/', component: MainPage },
  { path: '/login', component: Login },
  { path: '*', component: MainPage }
]

export default routes
