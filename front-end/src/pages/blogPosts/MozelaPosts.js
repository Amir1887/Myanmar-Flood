import axios from 'axios';
import React, { useEffect, useState } from 'react';

function MozelaPosts() {
    const [mozelaPosts, setMozelaPosts] = useState([]);

    useEffect(() => {
        const getMozelaPosts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/mozela/bulk');
                console.log("response from Mozela posts", response);
                if (response.data) {
                    setMozelaPosts(response.data);
                }
            } catch (error) {
                console.error("Error fetching Mozela posts:", error);
            }
        };
        getMozelaPosts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8" >All Warnings from Moezala.gov</h1>
            {mozelaPosts && mozelaPosts.length > 0 ? (
                <div className="grid grid-cols-1  lg:grid-cols-2 gap-6">
                    {mozelaPosts.map((post, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-gray-600 mb-2"><strong>Warning Date:</strong> {post.date}</p>
                            <p className="text-gray-600 mb-2"><strong>Hydrograph:</strong> {post.hydrograph}</p>
                            {post.imageUrl ? (
                                <img src={post.imageUrl} alt="Flood Warning Image" className="w-full h-auto rounded-md mb-4" />
                            ) : (
                                <p className="text-red-500 mb-4">No image available</p>
                            )}
                            {post.paragraph ? (
                                <p className="text-gray-700 mb-4">{post.paragraph}</p>
                            ) : (
                                <p className="text-gray-500 mb-4">No additional information available</p>
                            )}
                            <a href={post.readMoreLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                Read more
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No Mozela posts found.</p>
            )}
        </div>
    );
}

export default MozelaPosts;
