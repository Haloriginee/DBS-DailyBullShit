import React from 'react'

import { Box, Typography, Stack } from '@pankod/refine-mui'

import ReactApexChart from 'react-apexcharts'

import { ArrowCircleUpRounded } from '@mui/icons-material'

import { TotalRevenueOptions, TotalRevenueSeries } from './chart.config'

const ChartsTotal = () => {
  return (

    //2nd Box

    <Box p={4} flex={1} bgcolor="#fcfcfc" id="chart" display="flex" flexDirection="column" borderRadius="15px" >

      <Typography fontSize={20} color="#11142d" fontWeight={600} >
        Total DailyBullShit
      </Typography>

      <Stack my="20px" direction="row" gap={4} flexWrap="wrap" >

        <Typography fontSize={28} fontWeight={700} color="#11142d" >
          10,111,996 Days
        </Typography>

        <Stack direction="row" alignItems="center" gap={1}>
          <ArrowCircleUpRounded
            sx={{
              color: '#475be8',
              fontSize: 30,
            }}
          />

          <Stack>
            <Typography fontSize={20} color="#234E70">
              88.8%
            </Typography>
            <Typography fontSize={15} color="#808191">
              Than Last Decades
            </Typography>
          </Stack>

        </Stack>

      </Stack>

      <ReactApexChart
        options={TotalRevenueOptions}
        series={TotalRevenueSeries}
        type="bar"
        height={310}
      />

    </Box>


  )
}

export default ChartsTotal
