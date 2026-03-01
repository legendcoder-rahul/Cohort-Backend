import { Link } from 'react-router'
import '../style/form.scss'


const Login = () => {
  return (
   <main>
    <div className="form-container">
        <h1>Login</h1>
        <form>
            <input type="text" name='username' placeholder='Enter username' />
            <input type="password" name='password' placeholder='Enter password' />

            <button type='submit'>Login</button>
            <p>Don't have an account? <Link className='toggleAuthForm' to='/register'>Register</Link></p>
        </form>
    </div>
   </main>
  )
}

export default Login
