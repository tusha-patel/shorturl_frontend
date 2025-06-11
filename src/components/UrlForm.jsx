import { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api';
import { useSelector } from 'react-redux';
import { queryClient } from '../main';
// import { QueryClient } from '@tanstack/react-query';
const UrlForm = () => {
    const [url, setUrl] = useState("https://www.google.com");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [slugData, setSlugData] = useState("")
    const [shortUrl, setShortUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!url.trim()) {
            setError("Please enter a valid URL.");
            return;
        }
        setLoading(true);
        try {
            const data = await createShortUrl(url, slugData);
            setShortUrl(`${data.shortUrl || data}`);
            queryClient.invalidateQueries({ queryKey: ["userUrls"] })
            setError(null)
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        if (shortUrl) {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setError(null)
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <span className="mb-2 font-medium inline-block " >Enter your URL:</span>
                <input
                    type="url"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    placeholder="Enter your long URL here"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                {isAuthenticated && (
                    <>
                        <span className="mb-2 font-medium inline-block">Enter your custom slug:</span>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            placeholder="Enter your custom slug here"
                            value={slugData}
                            onChange={(e) => setSlugData(e.target.value)}
                        />
                    </>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition cursor-pointer "
                >
                    {loading ? "Generating..." : "Shorten URL"}
                </button>
                {/* Error Message */}
                {error && (
                    <p className="text-red-500 text-sm font-medium ">{error}</p>
                )}
                {/* Short URL Display */}
                {shortUrl && (
                    <div className="mt-6 flex gap-1">
                        <button
                            className="w-full text-start bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg text-sm truncate"
                            disabled
                        >
                            {shortUrl}
                        </button>
                        <button
                            onClick={handleCopy}
                            className={`px-4 py-2 rounded-lg text-white text-sm transition cursor-pointer ${copied
                                ? "bg-green-500"
                                : "bg-gray-500 hover:bg-gray-400 text-gray-800"
                                }`}
                        >
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                )}
            </form>
        </>
    )
}

export default UrlForm