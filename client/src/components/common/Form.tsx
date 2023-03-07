import React from 'react'

import { FieldValues, useForm } from '@pankod/refine-react-hook-form'
import { useGetIdentity } from '@pankod/refine-core'
import { useNavigate } from '@pankod/refine-react-router-v6'
import { Box, Stack, FormControl, FormHelperText, TextField, TextareaAutosize, Select, Button, MenuItem, Typography } from '@pankod/refine-mui'

import  CustomButton  from './CustomButton'
import { FormProps } from 'interfaces/common'



const Form = ({ type, register, handleSubmit, handleImageChange, showcaseImage, formLoading, onFinishHandler }: FormProps) => {
  return (

    <Box>

      <Typography fontSize={25} fontWeight={700} color="#11142d" >
        {type} a BS
      </Typography>

      <Box mt={2.5} bgcolor="#fcfcfc" padding="20px" borderRadius="15px" >
        <form style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '20px',
          width: '100%',
          gap: '20px',
        }}
        onSubmit={handleSubmit(onFinishHandler)}
        >

          <FormControl>

            <FormHelperText sx={{
              fontSize: '18px',
              fontWeight: 500,
              color: '#11142d',
              marginBottom: '10px 0',

            }}>
              Enter BS Name
            </FormHelperText>

            <TextField
              id="out-basic"
              color='info'
              variant="outlined"
              fullWidth
              {...register('title', { required: true })}
            />

          </FormControl>
          <FormControl>

            <FormHelperText sx={{
              fontSize: '18px',
              fontWeight: 500,
              color: '#11142d',
              marginBottom: '10px 0',

            }}>
              Enter BS Description
            </FormHelperText>

            <TextareaAutosize
              minRows={5}
              placeholder="Description"
              color='info'
              style={{
                width: '100%',
                borderColor: 'rgba(0,0,0,0.25)',
                borderRadius: '5px',
                padding: '10px',
                background: 'transparent',
                fontSize: '18px',
              }}
              {...register('description', { required: true })}
            />

          </FormControl>

          <Stack direction="row" gap={4}>
            <FormControl sx={{flex: 1}}>
              <FormHelperText sx={{
                fontSize: '18px',
                fontWeight: 500,
                color: '#11142d',
                margin: '10px 0'
              }}>
                Select Category
              </FormHelperText>

              <Select
                color='info'
                displayEmpty
                variant="outlined"
                inputProps={{ 'aria-label' : 'without label'}}
                defaultValue="Coding"
                {...register('showcaseType', { required: true })}
              >

                <MenuItem value="Coding">
                  Coding
                </MenuItem>
                <MenuItem value="WorkOut">
                  WorkOut
                </MenuItem>
                <MenuItem value="Games">
                  Games
                </MenuItem>
                <MenuItem value="Meals">
                  Meals
                </MenuItem>
                <MenuItem value="Reading">
                  Reading
                </MenuItem>
                <MenuItem value="Musics">
                  Musics
                </MenuItem>
                <MenuItem value="Nap4ever">
                  Nap4ever
                </MenuItem>
                <MenuItem value="SlackingToDeath">
                  SlackingToDeath
                </MenuItem>

              </Select>

            </FormControl>

            <FormControl>

              <FormHelperText sx={{
                fontSize: '18px',
                fontWeight: 500,
                color: '#11142d',
                margin: '10px 0',

              }}>
                Enter BS Duration (Hours)
              </FormHelperText>

              <TextField
                id="out-basic"
                type="number"
                color='info'
                variant="outlined"
                fullWidth
                {...register('day', { required: true })}
              />

            </FormControl>

          </Stack>
          <FormControl>

            <FormHelperText sx={{
              fontSize: '18px',
              fontWeight: 500,
              color: '#11142d',
              margin: '10px 0',
            }}>
              Location
            </FormHelperText>

            <TextField
              id="out-basic"
              color='info'
              variant="outlined"
              fullWidth
              {...register('location', { required: true })}
            />

          </FormControl>

          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography fontSize={18} fontWeight={500} color="#11142d" my="10px">
                Upload BS Photo
              </Typography>

              <Button
                component="label"
                sx={{
                  color: '#475be8',
                  fontSize: '18px',
                  width: 'fit-content',
                  textTransform: 'capitalize',
                }}
              >
                Upload *
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    // @ts-ignore
                    handleImageChange(e.target.files[0])
                  }}
                />
              </Button>

            </Stack>

              <Typography
                fontSize={16}
                color="#808191"
                sx={{wordBreak: 'break-all'}}
                >
                {showcaseImage ? showcaseImage.name : 'No file selected'}
              </Typography>

          </Stack>

          <CustomButton
            type="submit"
            title={formLoading ? 'Loading...' : type}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />

        </form>
      </Box>

    </Box>

  )
}

export default Form
