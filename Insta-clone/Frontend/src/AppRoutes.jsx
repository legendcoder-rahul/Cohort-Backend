import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

//new method
// export const routes = BrowserRouter([
//     {
//         path: '/login',
//         Element: (<Login />)
//     },
//     {
//         path: '/register',
//         Element: (<Register />)
//     }
// ])

//old method

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes