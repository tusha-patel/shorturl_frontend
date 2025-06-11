import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserUrls } from '../api/shortUrl.api';
import Loading from './Loading';

const UserUrl = () => {
    const [copiedUrl, setCopiedUrl] = useState(null);


    const { data, isLoading } = useQuery({
        queryKey: ["userUrls"],
        queryFn: getUserUrls,
        refetchInterval: 3000,
        staleTime: 0,

    });
    console.log(data);


    const handleCopy = async (url) => {
        try {
            await navigator.clipboard.writeText(`https://shorturl-node-988e.vercel.app/${url}`);
            setCopiedUrl(url);
            console.log(url);

            const timer = setTimeout(() => {
                setCopiedUrl(null);
                clearTimeout(timer); // Clean up the timer
            }, 2000);

            // Clean up timer if component unmounts
            return () => clearTimeout(timer);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    if (isLoading) return <Loading />


    return (
        <div className='mt-10'>
            {data?.length === 0 ? (
                <p className="text-gray-500">No URLs created yet.</p>
            ) : (
                <div className="overflow-x-auto max-h-60 ">
                    <table className="min-w-full text-left !border-0 !border-none rounded-xl">
                        <thead className="bg-gray-100 text-gray-700 sticky top-0  left-0">
                            <tr>
                                <th className="p-3">Original URL</th>
                                <th className="p-3">Short URL</th>
                                <th className="p-3">Clicks</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((url, index) => (
                                <tr key={index} className="hover:bg-gray-50 border-b border-gray-200 ">
                                    <td className="p-3 max-w-xs truncate text-gray-800">{url.full_url}</td>
                                    <td className="p-3 text-blue-700 ">
                                        <a href={`https://shorturl-node-988e.vercel.app/${url.short_url}`} target="_blank" rel="noopener noreferrer">
                                            {`https://shorturl-node-988e.vercel.app/${url.short_url}`}
                                        </a>
                                    </td>
                                    <td className="p-3 text-gray-700">
                                        <span className='px-2 py-1 bg-blue-600/20 rounded-2xl font-medium'>{url.clicks} click</span>
                                    </td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleCopy(`${url.short_url}`)}
                                            className={`px-4 py-1.5 rounded-md font-medium cursor-pointer transition-all duration-200 ${copiedUrl === url.short_url
                                                ? 'bg-green-500 text-white shadow-md'
                                                : 'bg-blue-700 text-white hover:bg-blue-800'
                                                }`}
                                        >
                                            {console.log(url)}
                                            {copiedUrl === url.short_url ? 'Copied!' : 'Copy'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserUrl;
