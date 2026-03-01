import { Link } from "react-router"
import axios from "axios"
import { useState } from "react"


const Register = () => {
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
         axios.post('http://localhost:3000/api/auth/register',{
            username,
            email,
            password
        })
        .then(res => {
            console.log(res.data)
        })
    }

    return (
        <div>
            <main>
                <div className="form-container">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <input 
                        onInput={(e) => { setusername(e.target.value) }} 
                        type="text" 
                        name='username' 
                        placeholder='Enter username' 
                        />

                        <input 
                        onInput={(e) => { setemail(e.target.value) }} 
                        type="text" 
                        name='email' 
                        placeholder='Enter email' 
                        />

                        <input 
                        onInput={(e) => { setpassword(e.target.value) }} 
                        type="password" 
                        name='password' 
                        placeholder='Enter password' 
                        />

                        <button type='submit' >Register</button>
                    </form>

                    <p>Already have an account? <Link to='/login' className='toggleAuthForm'>Login</Link></p>
                </div>
            </main>
        </div>
    )
}

export default Register
