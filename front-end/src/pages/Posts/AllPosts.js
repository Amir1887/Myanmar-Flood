import React, { useState } from "react";
import OrgPosts from "./OrganizationPosts/OrgPosts";
import UserPosts from "./UserPosts/UserPosts";
import OrganizationPosts from "./OrganizationPosts";
import UserPostsAll from "./UserPostsAll";
import { useUserType } from '../../context/UserContext';
function AllPosts() {
  // State to track the active section
  const [activeSection, setActiveSection] = useState(null);
  const {contextUserType, allUserData, allOrgData} = useUserType();
  console.log("contextUserType",contextUserType );
  console.log("allUserData", allUserData);
  console.log("allOrgData", allOrgData);


  let userId
  let orgId
  if(allUserData){
    userId = allUserData.id
  }
  if(allOrgData){
    orgId = allOrgData.id
  }
  // Function to display Organization Posts with props
  function DisplayOrg() {
    setActiveSection(<OrgPosts orgId={orgId} />);
  }

  // Function to display User Posts with props
  function DisplayUser() {
    setActiveSection(<UserPosts userId={userId} />);
  }
  // Function to display User Posts with props
  function DisplayTest() {
    setActiveSection(<OrganizationPosts orgId={orgId}/>);
  }
  function DisplayUserPosts() {
    setActiveSection(<UserPostsAll userId={userId}/>);
  }

  return (
    <div>
      <h1>All Posts</h1>
      {/* <button onClick={DisplayOrg}>Organizations Updates</button>
      <button onClick={DisplayUser}>User Discussion</button> */}
      <button onClick={DisplayTest}>Org ...</button>
      <button onClick={DisplayUserPosts}>User ...</button>

      {/* Render the active section */}
      <div>{activeSection}</div>
    </div>
  );
}

export default AllPosts;
