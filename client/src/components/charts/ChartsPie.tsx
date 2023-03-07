import React from 'react'
import { Box, Typography, Stack } from '@pankod/refine-mui'

import { PieChartProps } from 'interfaces/home'

import ReactApexChart from 'react-apexcharts'

const ChartsPie = ({ title, value, series, colors }: PieChartProps ) => {
  return (

    //1st Box

    <Box id="chart"
      flex={1}
      bgcolor="#fcfcfc"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      pl={4}
      py={2}
      borderRadius="15px"
      gap={2}
      width="fit-content"
      minHeight="110px"
    >
      <Stack direction="column">
        <Typography fontSize={20} color="#808191">
          {title}
        </Typography>
        <Typography fontSize={24} color="#11142d" fontWeight={700} mt={1}>
          {value}
        </Typography>
      </Stack>

      <ReactApexChart
        options= {{
          chart: { type: 'donut' },
          colors,
          legend: { show: false },
          dataLabels: { enabled: false },
        }}

        series={series}
        type="donut"
        width="100%"
      />

    </Box>

  )
}

export default ChartsPie
