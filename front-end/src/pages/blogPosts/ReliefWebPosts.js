import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReliefWebPosts() {
  const [reliefWebPosts, setReliefWebPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null); // To handle "Read More" feature

  useEffect(() => {
    const getReliefWebPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/reliefweb/bulk');
        console.log("response from relief Web Posts", response);
        if (response.data) {
          setReliefWebPosts(response.data);
        }
      } catch (error) {
        console.error("Error fetching relief Web Posts:", error);
      }
    };
    getReliefWebPosts();
  }, []);

  // Handle expansion of long content
  const handleExpand = (index) => {
    setExpandedPost(expandedPost === index ? null : index);
  };

  // Get sentiment color based on the sentiment type
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-green-100 text-green-800'; // Lighter green background, dark text
      case 'Negative':
        return 'bg-red-100 text-red-800'; // Lighter red background, dark text
      case 'Neutral':
        return 'bg-blue-100 text-blue-800'; // Lighter blue background, dark text
      default:
        return 'bg-gray-100 text-gray-800'; // Fallback to gray
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-3">Flood Highlights from ReliefWeb</h1>
      <h5 className="font-bold text-center mb-8 text-gray-600">Summary is made by AI (it can make mistakes).</h5>
      {reliefWebPosts && reliefWebPosts.length > 0 ? (
        <div className=" gap-6">
          {reliefWebPosts.map((post, index) => (
            <div key={index} className={`p-6 bg-white mb-6 rounded-lg shadow-md ${getSentimentColor(post.categorizedSentiment)}`}>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-2"><strong>Published Date:</strong> {new Date(post.publishedDate).toLocaleDateString()}</p>
              
              {/* Display summary if it's long enough, otherwise show full content */}
              {post.summary && post.summary.length > 10 ? (
                <p className="text-gray-700 mb-4">Summary :{post.summary}</p>
              ) : (
                // <p className="text-gray-700 mb-4">{post.articleContent}</p>
                <a href={post.articleUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                View Full Article
              </a>
              )}

              {/* Handle "Read More" for large content */}
              {/* {post.articleContent.length > 200 && (
                <div>
                  <p className="text-gray-700 mb-4">
                    {expandedPost === index ? post.articleContent : post.articleContent.substring(0, 50) + '...'}
                    <button className="text-blue-500 ml-2" onClick={() => handleExpand(index)}>
                      {expandedPost === index ? 'Read Less' : 'Read More'}
                    </button>
                  </p>
                </div>
              )} */}

              <a href={post.articleUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                View Full Article
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No highlights available</p>
      )}
    </div>
  );
}

export default ReliefWebPosts;
