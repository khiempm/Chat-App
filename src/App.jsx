import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'
const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={<Login/>}/> */}
        <Route path='/' element={<Chat/>} />

      </Routes>
    </div>
  )
}

export default App
