import React from 'react'
import { useList } from '@pankod/refine-core'

import { ShowcaseCard, ChartsPie, ShowcaseRef, ChartsTotal, TopAgent } from 'components'

import { Box, Stack, Typography } from '@pankod/refine-mui'

const Home = () => {

  const { data, isError, isLoading } = useList({
    resource: "showcases",
    config: {
      pagination: {
        pageSize: 4
      }
    }
  })

  const latestShowcases = data?.data ?? [];

  if(isError) return <Typography>Error</Typography>
  if(isLoading) return <Typography>Loading...</Typography>

  return (
      //"box" is a "div" with additional properties
    <Box>
      <Typography color="#11142d" fontSize={25} fontWeight={700}>
        DashBoard
      </Typography>

      <Box mt="20px" gap={4} display="flex" flexWrap="wrap">
      <ChartsPie
          title="Social Media"
          value={666}
          colors={['#02539D', '#EEA47F']}
          series={[75, 25]}
        />
        <ChartsPie
          title="WorkOut"
          value={404}
          colors={['#234E70', '#FAF8BF']}
          series={[50, 50]}
        />
        <ChartsPie
          title="Coding"
          value={666}
          colors={['#2BAE66', '#FCF6F6']}
          series={[75, 25]}
        />
        <ChartsPie
          title="Gaming"
          value={6543}
          colors={['#78A7D3', '#8A307F']}
          series={[20, 80]}
        />
        <ChartsPie
          title="Total DBS"
          value={888}
          colors={['#FFE716', '#101920']}
          series={[65, 35]}
        />
      </Box>

      <Stack gap={4} mt="25px" width="100%" direction={{ xs: 'column', lg: 'row' }} >
        <ChartsTotal/>
        <ShowcaseRef/>
      </Stack>

      <Box
        mt="25px"
        bgcolor="#fcfcfc"
        borderRadius="15px"
        padding="20px"
        display="flex"
        flex={1}
        flexDirection="column"
      >
        <Typography color="#11142d" fontSize="18px" fontWeight={600}>
          Latest BS Showcases
        </Typography>

        <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>

          {latestShowcases.map((showcase) => (
            <ShowcaseCard
              id={showcase._id}
              key={showcase._id}
              title={showcase.title}
              location={showcase.location}
              day={showcase.day}
              photo={showcase.photo}
            />
          ))}
        </Box>
      </Box>
    </Box>

  )
}

export default Home
