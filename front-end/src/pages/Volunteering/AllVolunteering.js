import React from 'react'
import { useUserType } from '../../context/UserContext';
import Volunteering from './VolunteeringUserSide';
import VolunteeringToOrgSide from './VolunteeringToOrgSide';
function AllVolunteering() {
    const {contextUserType, allUserData, allOrgData} = useUserType();
    let userId;
    if(allUserData){
       userId = allUserData.id;
    }
    
    let organizationId;
    if(allOrgData){
      organizationId = allOrgData.id;
    }
  return (
    <div>
          {contextUserType === "user" && <Volunteering userId={userId}/>}
          {contextUserType === "organization" && <VolunteeringToOrgSide organizationId={organizationId}/>}
    </div>
  )
}

export default AllVolunteering
