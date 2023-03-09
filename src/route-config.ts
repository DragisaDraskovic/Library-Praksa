import { redirect } from 'react-router-dom'

import MainPage from './components/mainPage/MainPage'
import Login from './components/login/Login'




const routes = [
  // { path: '/', component: Login , expect: true },
  // { path: '/', component: },
  // { path: '/login', component: Login },
  { path: '/home', component: MainPage }
  // { path: '*', component: Login }

]

export default routes
