import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'

const App = () => {
  const navigate = useNavigate()
  const {loadUserData} = useContext(AppContext)
  useEffect(() =>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate('/Chat')
        await loadUserData(user.uid)
      } else{
        navigate('/')
      }
    })
  },[])
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Chat' element={<Chat/>} />
        <Route path='/profile' element={<ProfileUpdate/>} />
      </Routes>
    </div>
  )
}

export default App
