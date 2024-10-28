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
        <div>
            <h1>All warnings from Mozela</h1>
            {mozelaPosts && mozelaPosts.length > 0 ? (
                mozelaPosts.map((post, index) => (
                    <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                        <h2>Post Title: {post.title}</h2>
                        <p>Warning Date: {post.date}</p>
                        <p>Hydrograph: {post.hydrograph}</p>
                        {post.imageUrl ? (
                            <img src={post.imageUrl} alt="Flood Warning Image" style={{ maxWidth: '100%' }} />
                        ) : (
                            <p>No image available</p>
                        )}
                        {post.paragraph ? (
                            <p>{post.paragraph}</p>
                        ) : (
                            <p>No additional information available</p>
                        )}
                        <a href={post.readMoreLink} target="_blank" rel="noopener noreferrer">
                            Read more
                        </a>
                    </div>
                ))
            ) : (
                <p>No Mozela posts found.</p>
            )}
        </div>
    );
}

export default MozelaPosts;
