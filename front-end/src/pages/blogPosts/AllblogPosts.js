import React, { useState } from 'react';
import MozelaPosts from './MozelaPosts';
import ReliefWebPosts from './ReliefWebPosts';

function AllBlogPosts() {
    // Step 1: Define a state variable to keep track of which component to render
    const [currentComponent, setCurrentComponent] = useState(null);

    // Step 2: Create functions to update the state
    function loadMozela() {
        setCurrentComponent(<MozelaPosts />);
    }

    function loadReliefWeb() {
        setCurrentComponent(<ReliefWebPosts />);
    }
    
    return (
        <div>
            <h1>All Blog Posts</h1>
            
            {/* Step 3: Button onClick handlers to set the current component */}
            <button onClick={loadMozela}>All Mozela Posts</button>
            <button onClick={loadReliefWeb}>All Relief Web Posts</button>

            {/* Render the current component */}
            <div>
                {currentComponent}
            </div>
        </div>
    );
}

export default AllBlogPosts;
