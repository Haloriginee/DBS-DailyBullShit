import React from 'react'
import { Box, Stack, Typography } from '@pankod/refine-mui'

import { ShowcaseRefInfo } from 'constants/index'

interface ProBarProps {
  title: string
  percentage: number
  color: string
}

const ProBar = ({ title, percentage, color }: ProBarProps) => (
  <Box width="100%">
    <Stack direction="row" alignItems="center" justifyContent="space-between">

      <Typography fontSize={15} color="#808191" fontWeight={500}>
        {title}
      </Typography>
      <Typography fontSize={15} color="#808191" fontWeight={500}>
        {percentage}%
      </Typography>

    </Stack>

    <Box mt={2} position="relative" width="100%" height="8px" border-radius={1} bgcolor="#e4e8ef" >
      <Box
        position="absolute"
        top={0}
        left={0}
        height="100%"
        borderRadius={1}
        width={`${percentage}%`}
        bgcolor={color}
      />
    </Box>

  </Box>
)

const showcaseRef = () => {
  return (

    //3rd Box

    <Box p={4} bgcolor="#fcfcfc" display="flex" flexDirection="column" borderRadius="15px" minWidth={490} id="chart" >

      <Typography fontSize={20} color="#11142d" fontWeight={600} >
        Lazyness Show-Off
      </Typography>

      <Stack my="20px" direction="column" gap={4}>

        {ShowcaseRefInfo.map((item) => (
          <ProBar
            key={item.title}
            title={item.title}
            percentage={item.percentage}
            color={item.color}
          />
        ))}

      </Stack>

    </Box>

  )
}

export default showcaseRef
