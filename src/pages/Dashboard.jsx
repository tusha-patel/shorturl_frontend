import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 flex-col ">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl">
                <h1 className="text-2xl font-bold text-center mb-4">URL Shortener</h1>
                <UrlForm />
                <UserUrl />
            </div>
        </div>
    )
}

export default Dashboard