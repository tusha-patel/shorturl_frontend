import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
    const [login, setLogin] = useState(true);
    return (
        <div className='min-h-screen flex justify-center items-center bg-gray-100  '>
            {login ? <LoginForm loginState={setLogin} /> : <RegisterForm loginState={setLogin} />}
        </div>
    )
}

export default AuthPage