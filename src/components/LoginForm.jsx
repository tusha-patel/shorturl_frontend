import React, { useEffect, useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { useNavigate } from '@tanstack/react-router';
import Loading from './Loading';

const LoginForm = ({ loginState }) => {
    const [email, setEmail] = useState('tusha@gmail.com');
    const [password, setPassword] = useState('tusha@123');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    console.log(auth);

    useEffect(() => {
        if (error) {
            console.log("called");

            const timer = setTimeout(() => {
                setError(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const data = await loginUser(email, password);
            dispatch(login(data.user));
            navigate({ to: "/dashboard" })
            setLoading(false);
            setError(null);
            setEmail("");
            setPassword("")

        } catch (error) {
            console.log(error, "error from login user");
            setLoading(false)
            setError(error.message || "Login fail , please check your credentials")
        }
    };

    if (loading) return <Loading />

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg ">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className='text-sm text-red-500 font-medium '>{error}</p>}
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
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer"
                >
                    Login
                </button>
                <p className="text-center mt-2 cursor-pointer ">
                    Don’ t have an account?{' '}
                    <span onClick={() => loginState(false)} className="text-blue-600 hover:underline">
                        Register
                    </span>
                </p>

            </form>
        </div>

    );
};

export default LoginForm;
