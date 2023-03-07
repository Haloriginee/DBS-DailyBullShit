import React from 'react'

import { useOne } from "@pankod/refine-core";
import { useParams } from '@pankod/refine-react-router-v6';
import { Profile } from 'components';

const AgentProfile = () => {

  const { id } = useParams();
  const { data, isError, isLoading } = useOne({
    resource: 'users',
    id: id as string,
  });

  const myProfile = data?.data ?? [];

  if(isError) return <div>error</div>
  if(isLoading) return <div>loading...</div>

  return (

    <Profile
      type="Agent"
      name={myProfile.name}
      avatar={myProfile.avatar}
      email={myProfile.email}
      showcases={myProfile.allShowcases}
    />
  )
}

export default AgentProfile
