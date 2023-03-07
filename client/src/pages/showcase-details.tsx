/* eslint-disable no-restricted-globals */
import React from 'react'

import { useDelete, useGetIdentity, useShow } from '@pankod/refine-core';
import { Box, Typography, Stack } from '@pankod/refine-mui';
import { useParams, useNavigate } from '@pankod/refine-react-router-v6';
import { ChatBubble, Edit, Delete, Star, Place, Phone } from '@mui/icons-material';
import { CustomButton } from 'components';

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const ShowcaseDetails = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const { queryResult } = useShow();
  const { data: user } = useGetIdentity();
  const { mutate } = useDelete();

  const { data, isError, isLoading } = queryResult;

  const showcaseDetails = data?.data ?? {};

  if(isError) return <div>Error</div>
  if(isLoading) return <div>Loading...</div>

  const isCurrentUser = user.email === showcaseDetails.creator.email;

  const handleDeleteShowcase = () => {
    const response = confirm(
        "Are you sure you want to delete this BS ?",
    );
    if (response) {
        mutate(
            {
                resource: "showcases",
                id: id as string,
            },
            {
                onSuccess: () => {
                    navigate("/showcases");
                },
            },
        );
    }
};

  return (
    <Box
      width="fit-content"
      bgcolor="#fcfcfc"
      borderRadius="15px"
      padding="20px"
    >
      <Typography color="#11142d" fontSize={25} fontWeight={700}>
        Details
      </Typography>

      <Box display="flex" flexDirection={{xs: 'column', lg: 'row'}} mt="20px" gap={4}>

        <Box flex={1} maxWidth={764}>
          <img
            src={showcaseDetails.photo}
            alt={showcaseDetails.title}
            height={546}
            style={{objectFit: "cover", borderRadius:'10px'}}
            className="property_details-img"
          />

          <Box mt="15px">
            <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap">
              <Typography color="#11142d" textTransform="capitalize" fontSize={18} fontWeight={500}>
                {showcaseDetails.showcaseType}
              </Typography>
              <Box>
                {[1, 2, 3, 4, 5].map((star) => <Star sx={{ color: '#f2c49c' }} key={`star-${star}`}/> )}
              </Box>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap">

              <Box>

                <Typography color="#11142d" textTransform="capitalize" fontSize={22} fontWeight={600}>
                  {showcaseDetails.title}
                </Typography>

                <Stack mt={0.5} gap={0.5} alignItems="center" direction="row">
                  <Place sx={{ color:"#808191" }} />
                  <Typography color="#808191" fontSize={14}>
                    {showcaseDetails.location}
                  </Typography>
                </Stack>
              </Box>

              <Box>
                <Typography
                  color="#11142D"
                  fontSize={16}
                  fontWeight={600}
                  mt="10px"
                >
                  Day
                </Typography>

                <Stack
                  direction="row"
                  alignItems="flex-end"
                  gap={1}
                >
                  <Typography
                    color="#475BE8"
                    fontSize={25}
                    fontWeight={700}
                  >
                    {showcaseDetails.day}
                  </Typography>
                  <Typography
                    color="#808191"
                    fontSize={14}
                    mb={0.5}
                  >
                    to make this
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            <Stack mt="25px" direction="column" gap="10px">
              <Typography fontSize={18} color="#11142D">
                Description
              </Typography>
              <Typography fontSize={14} color="#808191">
                {showcaseDetails.description}
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          flex={1}
          maxWidth={326}
          gap="20px"
        >
          <Stack
            width="100%"
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="1px solid #E4E4E4"
            borderRadius={2}
            p={2}
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              mt={2}
            >
               <img
                src={checkImage(showcaseDetails.creator.avatar)? showcaseDetails.creator.avatar : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"}
                alt="avatar"
                height={90}
                width={90}
                style={{
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />

              <Box mt="15px">
                <Typography
                  color="#11142D"
                  fontSize={18}
                  fontWeight={600}
                >
                  {showcaseDetails.creator.name}
                </Typography>
                <Typography
                  color="#808191"
                  mt="5px"
                  fontSize={14}
                  fontWeight={400}
                >
                  Creator
                </Typography>
              </Box>

              <Stack
                mt="15px"
                gap={1}
                direction="row"
                alignItems="center"
              >
                <Place sx={{ color: "#808191" }} />
                <Typography
                  color="#808191"
                  fontSize={14}
                  fontWeight={400}
                >
                  Somewhere
                </Typography>
              </Stack>

              <Typography
                color="#11142D"
                mt={1}
                fontWeight={600}
                fontSize={16}
              >
                {showcaseDetails.creator.allShowcases.length}{" "}
                  Showcase of Bs
              </Typography>
            </Stack>

            <Stack
              width="100%"
              direction="row"
              flexWrap="wrap"
              gap={2}
              mt="25px"
            >
              <CustomButton
                title={!isCurrentUser ? "Message" : "Edit"}
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
                icon={
                  !isCurrentUser ? <ChatBubble /> : <Edit />
                }
                handleClick={() => {
                  if (isCurrentUser) {
                    navigate(`/showcases/edit/${showcaseDetails._id}`,);
                  }
                }}
              />

              <CustomButton
                color="#FCFCFC"
                title={!isCurrentUser ? "Call" : "Delete"}
                backgroundColor={!isCurrentUser ? "#2ED480" : "#d42e2e"}
                fullWidth
                icon={!isCurrentUser ? <Phone /> : <Delete />}
                handleClick={() => {
                  if (isCurrentUser) handleDeleteShowcase();
                }}
              />
          </Stack>
        </Stack>

        <Stack>
          <img
            src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
            alt='Map'
            style={{ borderRadius: 10, objectFit: "cover" }}
            width="100%"
            height={306}
          />
        </Stack>

        <Box>
          <CustomButton
            color="#FCFCFC"
            fullWidth
            title="Admire Now"
            backgroundColor="#475BE8"
          />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ShowcaseDetails
