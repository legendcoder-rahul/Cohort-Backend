import React, { useState } from 'react'
import './auth.css'
import google from '../assets/google.svg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        { withCredentials: true }
      )

      alert("Login successful ✅")
      navigate("/notes")

    } catch (error) {
      alert(error.response?.data?.message || "Login failed")
    }
  }


  return (
    <div className='loginContainer'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <button type='submit'>Login</button>
        <hr />
        <div className='Register'>
          <p>New user?</p>
          <Link to='/register'><span>Create an account</span></Link>
        </div>
        <p className='or'>or</p>

        <div className='google'>
          <img src={google} alt="" />
          <button>Continue with Google</button>
        </div>
      </form>
    </div>
  )
}

export default Login
