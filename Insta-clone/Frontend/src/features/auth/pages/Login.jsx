import { Link } from 'react-router'
import '../style/form.scss'
import { useState } from 'react'
import axios from 'axios'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

    }


  return (
   <main>
    <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input 
            onInput={(e)=> {setUsername(e.target.value)}}
            type="text" 
            name='username' 
            placeholder='Enter username' 
            />

            <input 
            onInput={(e)=> {setPassword(e.target.value)}}
            type="password" 
            name='password' 
            placeholder='Enter password' />

            <button type='submit'>Login</button>
            <p>Don't have an account? <Link className='toggleAuthForm' to='/register'>Register</Link></p>
        </form>
    </div>
   </main>
  )
}

export default Login
