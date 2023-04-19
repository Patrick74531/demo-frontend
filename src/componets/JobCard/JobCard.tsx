import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  styled,
} from '@mui/material'
import { LocationOn, Schedule, MonetizationOn } from '@mui/icons-material'
import PrimaryButton from '../PrimaryButton/PrimaryButton'
import { Carousel } from 'react-responsive-carousel'
import useTimeDifference from '../../hooks/useTimeDifference/useTimeDifference'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import { useNavigate } from 'react-router-dom'
import { JobCardProps } from '../../types/types'

const CustomTypography = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
})

const FlexContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: 8,
})

const JobCard: React.FC<JobCardProps> = ({ jobCardData }) => {
  const {
    id,
    images,
    description,
    budget,
    date,
    location,
    clothingType,
    quotationCount,
  } = jobCardData

  //custom hooks for calculating the difference between the time a job was created and the current time
  const timeDiff = useTimeDifference(date)
  const navigate = useNavigate()

  return (
    <Card sx={{ width: 345 }}>
      {/* display mmultiple images */}

      <Carousel showThumbs={false}>
        {images.map((image, index) => (
          <CardMedia
            key={index}
            component='img'
            height='140'
            image={image}
            alt={image}
          />
        ))}
      </Carousel>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 130 }}>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
        </Box>
        <FlexContainer>
          <CustomTypography variant='body2' color='text.secondary'>
            Budget: <MonetizationOn /> {budget ? budget : 'not-set'}
          </CustomTypography>
          <CustomTypography variant='body2' color='text.secondary'>
            Types of clothing: {clothingType}
          </CustomTypography>
        </FlexContainer>

        <FlexContainer>
          <CustomTypography variant='body2' color='text.secondary'>
            Location: <LocationOn /> {location}
          </CustomTypography>
          <CustomTypography variant='body2' color='text.secondary'>
            Date: <Schedule /> {timeDiff} ago
          </CustomTypography>
        </FlexContainer>

        <FlexContainer>
          <Chip
            label={`QUOTATIONS: ${quotationCount}`}
            variant='outlined'
            sx={{
              padding: '20px 10px',
              borderRadius: '25px',
              color: '#8460c2',
            }}
          />
          <PrimaryButton
            component='button'
            name='DETAILS'
            onClick={() => navigate(`/maker/jobs/details/${id}`)}
          />
        </FlexContainer>
      </CardContent>
    </Card>
  )
}

export default JobCard
