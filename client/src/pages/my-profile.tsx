import React from 'react'

import { useGetIdentity, useOne } from '@pankod/refine-core';
import { Profile } from 'components';

const MyProfile = () => {

  const { data: user } = useGetIdentity();
  const { data, isError, isLoading } = useOne({
    resource: 'users',
    id: user?.userid,
  });

  const myProfile = data?.data ?? [];

  if(isError) return <div>error</div>
  if(isLoading) return <div>loading...</div>

  return (
    <Profile
      type="My"
      name={myProfile.name}
      avatar={myProfile.avatar}
      email={myProfile.email}
      showcases={myProfile.allShowcases}
    />
  )
}

export default MyProfile
