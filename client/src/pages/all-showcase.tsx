import { useMemo } from 'react'

import { Add } from '@mui/icons-material'
import { useTable } from '@pankod/refine-core'
import { Box, Stack, TextField, Typography, Select, MenuItem } from '@pankod/refine-mui'
import { useNavigate } from '@pankod/refine-react-router-v6'


import { ShowcaseCard, CustomButton } from 'components'

const AllShowcase = () => {

  const navigate = useNavigate();


  // refine gifts !!
  const {
    tableQueryResult : { data, isError, isLoading },
    current, setCurrent, setPageSize, pageCount, sorter, setSorter, filters, setFilters
  } = useTable();

  const AllShowcases = data?.data ?? [];

  const currentDay = sorter.find((item) => item.field === 'day')?.order;

  const toggleSort = (field:string) => {
    setSorter([{ field, order: currentDay === 'asc' ? 'desc' : 'asc' }])
  }

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => ('field' in item ? item : []));

    return {
      showcaseType: logicalFilters.find((item) => item.field === 'showcaseType')?.value || '',
      title: logicalFilters.find((item) => item.field === 'title')?.value || '',
    }
  },[filters])

  if(isError) return <Typography>Error...</Typography>
  if(isLoading) return <Typography>Loading...</Typography>

  return (

    <Box>

      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }} >
        <Stack direction="column" width="100%" >

        <Typography fontSize={25} fontWeight={700} color="#11142d" >
          {!AllShowcases.length ? 'Nothing To See' : 'All Showcases'}
        </Typography>

        <Box mt={3} mb={2} display="flex" flexWrap="wrap" justify-content="space-between" width="84%" >
          <Box display="flex" gap={2} flexWrap="wrap" mb={{ xs:'20px', sm: 0 }}>
            <CustomButton
              title={`Sort By Day ${currentDay === 'asc' ? '↑' : '↓'} `}
              handleClick={() => toggleSort('day')}
              color="#fcfcfc"
              backgroundColor="#475be8"
            />
            <TextField
              color='info'
              variant='outlined'
              placeholder="Search"
              value={currentFilterValues.title}
              onChange ={(e) => {
                setFilters([
                  {
                    field: 'title',
                    operator: 'contains',
                    value: e.currentTarget.value ? e.currentTarget.value : undefined
                  },
                ])
              }}
            />

            <Select
              variant="outlined"
              color="info"
              displayEmpty
              required
              inputProps={{ 'aria-label' : 'Without label' }}
              defaultValue=""
              value={currentFilterValues.showcaseType}
              onChange ={(e) => {
                setFilters(
                [
                  {
                    field: 'showcaseType',
                    operator: 'eq',
                    value: e.target.value ? e.target.value : undefined
                  },
                ], 'replace')
              }}
            >
              <MenuItem value="">All</MenuItem>
              {["Coding", 'WorkOut', 'Games', 'Meals', 'Reading', 'Musics', 'Nap4ever', 'SlackingToDeath'].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>

          </Box>
        </Box>

        </Stack>
      </Box>

      <Stack alignItems="center" justifyContent="space-between" direction="row">
        <CustomButton
          title="Add Showcase"
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add />}
          handleClick={() => navigate('/showcases/create')}
        />
      </Stack>

      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }} >
        {AllShowcases.map((showcase) => (
          <ShowcaseCard
            key={showcase._id}
            id={showcase._id}
            title={showcase.title}
            day={showcase.day}
            location={showcase.location}
            photo={showcase.photo}
          />
        ))}
      </Box>

      {AllShowcases.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap={2} mt={3}>
          <CustomButton
            title="Previous"
            backgroundColor='#475be8'
            color='#fcfcfc'
            handleClick={() => setCurrent((prev) => prev - 1)}
            disabled={!(current > 1)}
          />

          <Box display={{ xs: 'hidden', sm: 'flex'}} alignItems='center' gap="5px" >
            Page{' '}<strong>{current} of {pageCount}</strong>
          </Box>

          <CustomButton
            title="Next"
            backgroundColor='#475be8'
            color='#fcfcfc'
            handleClick={() => setCurrent((prev) => prev + 1)}
            disabled={current === pageCount}
          />

          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ 'aria-label' : 'Without label' }}
            defaultValue="10"
            onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10)}
          >
            {[10, 20, 30, 40, 50].map((size) => (

              <MenuItem value={size} key={size}>Show {size}</MenuItem>

            ))}

          </Select>



        </Box>
      )}

    </Box>

  )
}

export default AllShowcase
