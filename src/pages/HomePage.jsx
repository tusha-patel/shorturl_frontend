import UrlForm from '../components/UrlForm';

const HomePage = () => {

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-4">URL Shortener</h1>
                    <UrlForm />
                </div>
            </div>
        </>
    )
}

export default HomePage