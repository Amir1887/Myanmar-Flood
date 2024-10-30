import React, { useState } from "react";
import OrgPosts from "./OrganizationPosts/OrgPosts";
import UserPosts from "./UserPosts/UserPosts";

function AllPosts() {
  // State to track the active section
  const [activeSection, setActiveSection] = useState(null);

  // Function to display Organization Posts with props
  function DisplayOrg() {
    setActiveSection(<OrgPosts />);
  }

  // Function to display User Posts with props
  function DisplayUser() {
    setActiveSection(<UserPosts />);
  }

  return (
    <div>
      <h1>All Posts</h1>
      <button onClick={DisplayOrg}>Organizations Updates</button>
      <button onClick={DisplayUser}>User Discussion</button>

      {/* Render the active section */}
      <div>{activeSection}</div>
    </div>
  );
}

export default AllPosts;
