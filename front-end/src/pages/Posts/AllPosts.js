import React from 'react'
import OrgPosts from './OrganizationPosts/OrgPosts'
import UserPosts from './UserPosts/UserPosts'

function AllPosts() {
  return (
    <div>
      <h1>All Posts</h1>
      <OrgPosts/>
      <UserPosts/>
    </div>
  )
}

export default AllPosts
