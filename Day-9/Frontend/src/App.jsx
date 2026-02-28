import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Notes from './pages/Notes'
import {  Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/notes" element={<Notes />} />

    </Routes>
  )
}

export default App
