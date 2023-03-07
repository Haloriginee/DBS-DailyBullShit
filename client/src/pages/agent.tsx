import React from 'react'

import { useList } from '@pankod/refine-core';
import { Typography, Box } from '@pankod/refine-mui';
import { AgentCard } from 'components';

const Agent = () => {

  const { data, isError, isLoading } = useList({
    resource: "users",
  });

  const allAgents = data?.data ?? [];

  if (isError) return <div>Error</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <Box>

      <Typography color="#11142d" fontSize={25} fontWeight={700}>
        List of Creators
      </Typography>

      <Box
        mt="20px"
        sx={{
          backgroundColor: '#fcfcfc',
          display: 'grid',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        {allAgents.map((agent) => (
          <AgentCard
            key={agent.id}
            id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            noOfShowcases={agent.allShowcases.length}
          />
        ))}
      </Box>

    </Box>
  )
}

export default Agent
