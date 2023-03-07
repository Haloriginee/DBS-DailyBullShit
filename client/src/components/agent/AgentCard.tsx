import React from 'react'

import { AgentCardProp, InfoBarProps } from 'interfaces/agent';
import { EmailOutlined, LocationCity, Place, Phone } from '@mui/icons-material';
import { Stack, Box, Typography } from '@pankod/refine-mui';
import { useGetIdentity } from '@pankod/refine-core';

import { Link } from '@pankod/refine-react-router-v6';

const InfoBar = ({ icon, name }: InfoBarProps) => (
  <Stack flex={1} direction="row" gap={1.5} minWidth={{ xs: '100%', sm: 300 }} >
    {icon}
    <Typography color="#808191" fontSize={14} >
      {name}
    </Typography>
  </Stack>
);

const AgentCard = ( {id, avatar, email, name, noOfShowcases}: AgentCardProp ) => {

  const { data: currentUser } = useGetIdentity();

  const genLink = () => {
    if(currentUser.email === email) return '/my-profile'
    return `/agent/show/${id}`
  }

  return (
    <Box
      component={Link}
      to={genLink()}
      width="100%"
      sx={{
        backgroundColor: '#fcfcfc',
        gap: '20px',
        padding: '20px',
        display: 'flex',
        flexDirection: { xs: "column", sm: "row" },
        '&:hover': {
          boxShadow: '0 22px 45px 2px rgba(176, 176, 176, 0.2)'
        }
      }}
    >
      <img
        src={avatar}
        alt="avatar"
        width="90px"
        height="90px"
        style={{ borderRadius: 8, objectFit: 'cover' }}
      />

      <Stack direction="column" justifyContent="space-between" flex={1} gap={{xs: 4, sm: 2}}>
        <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
          <Typography color="#11142d" fontSize={22} fontWeight={600}>
            {name}
          </Typography>
          <Typography color="#808191" fontSize={14}>
            Slacker Proffesional
          </Typography>
        </Stack>
        <Stack direction="row" flexWrap="wrap" gap={2} justifyContent="space-between" alignItems="center">

          <InfoBar
            icon={<EmailOutlined sx={{color:'#808191'}} />}
            name={email}
          />
          <InfoBar
            icon={<Place sx={{color:'#808191'}} />}
            name="Tatouine"
          />
          <InfoBar
            icon={<Phone sx={{color:'#808191'}} />}
            name="66 66 66 66 66"
          />
          <InfoBar
            icon={<LocationCity sx={{color:'#808191'}} />}
            name={`${noOfShowcases} Showcases`}
          />

        </Stack>
      </Stack>

    </Box>
  )
}

export default AgentCard
