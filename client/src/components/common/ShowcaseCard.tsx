import React from 'react'

import { Link } from '@pankod/refine-react-router-v6';
import { Box, Card, CardContent, CardMedia, Typography, Stack } from '@pankod/refine-mui';
import { Place } from '@mui/icons-material';
import { ShowcaseCardProps } from 'interfaces/showcase';

const ShowcaseCard = ({ id, title, location, day, photo }: ShowcaseCardProps ) => {
  return (
    <Card
      component={Link}
      to={`/showcases/show/${id}`}
      sx={{
        maxWidth: '330px',
        padding: '10px',
        '&:hover': {
          boxShadow: '0 22px 45px 2px rgba(176, 176, 176, 0.1)'
        },
        textDecoration: 'none',
        cursor: 'pointer'
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        width="100%"
        height={210}
        image={photo}
        alt="card"
        sx={{ borderRadius: '10px' }}
      />

      <CardContent sx={{ display: 'flex', paddingX: '5px', gap: '10px', justifyContent: 'space-between', flexDirection: 'row' }} >
        <Stack direction="column" gap={1}>
          <Typography fontWeight={500} color= "#11142d" fontSize={16} >
            {title}
          </Typography>
          <Stack direction="row" gap={0.5} alignItems="flex-start" >
            <Place
              sx={{
                fontSize: 18,
                marginTop: 0.5,
                color: '#11145d'
              }}
            />
            <Typography fontSize={14} color="#808191" >
              {location}
            </Typography>
          </Stack>
        </Stack>

        <Box height="fit-content" bgcolor="#dadefa" borderRadius={1} px={1.5} py={0.5}>
          <Typography fontSize={12}  color="#475be8" fontWeight={600}>
            Took me {day} days to do
          </Typography>
        </Box>

      </CardContent>

    </Card>
  )
}

export default ShowcaseCard
