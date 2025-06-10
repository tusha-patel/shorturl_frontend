import React, { useState } from 'react';
import { registerUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { useNavigate } from '@tanstack/react-router';
import Loading from './Loading';

const RegisterForm = ({ loginState }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log('Register:', { name, email, password });
        try {
            const data = await registerUser(name, email, password);
            dispatch(login(data.user));
            navigate({ to: "/dashboard" });
            setLoading(false);
            setError(null)

        } catch (error) {
            setError(error.message || "register failed , please enter valid credential ");
            setLoading(false);
        }
    };

    if (loading) return <Loading />

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg   ">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className='text-sm text-red-500 font-medium '>{error}</p>}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer "
                >
                    Register
                </button>
                <p className="text-center mt-2 cursor-pointer ">
                    Already have an account?{' '}
                    <span onClick={() => loginState(true)} className="text-blue-600 hover:underline">
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
