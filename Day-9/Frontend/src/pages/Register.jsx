import { useState } from 'react'
import './auth.css'
import google from '../assets/google.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom"



const Register = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)

        try {
            const response = await axios.post('http://localhost:3000/api/auth/register',
                formData, {
                withCredentials: true
            }
            )
            alert("User Registered Successfully")
            navigate("/notes")
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong")
        }


    }



    return (
        <div className='RegisterContainer'>
            <h1>Sign Up</h1>

            <form onSubmit={handleSubmit}>
                <div className='name'>
                    <label htmlFor="username">UserName</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder='Enter your name' />
                </div>

                <div className='name'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Enter your email' />
                </div>

                <div className='name'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Enter your Password' />
                </div>

                <button type="submit">Register Now</button>
            </form>
            <div className='Register'>
                <p>Already have an account?</p>
                <Link to='/login'><span>Login</span></Link>
            </div>
            <hr />
            <p className='or'>or</p>

            <div className='google'>
                <img src={google} alt="" />
                <button>Continue with Google</button>
            </div>

        </div>
    )
}

export default Register