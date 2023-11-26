import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUp'
import SignInPage from './pages/SignIn'
import NotFoundPage from './pages/404'

function App() {

  return (
    <>
      <Routes>
        <Route index path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/signin' element={<SignInPage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </>
  )
}

export default App
