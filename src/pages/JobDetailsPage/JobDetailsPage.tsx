import { Box, Container, Grid, Typography, Button, Dialog } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import PrimaryButton from '../../componets/PrimaryButton/PrimaryButton'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Quotation from '../../componets/Quotation/Quotation'
import Loading from '../../componets/Loading/Loading'
import { BackendJobsDataType, JobsData } from '../../types/types'

const JobDetails = () => {
  const navigate = useNavigate()
  const param = useParams()
  const id = param.id
  const initialJobData = {
    id: 0,
    images: [],
    description: '',
    budget: 0,
    date: '',
    clothingType: '',
    quotationCount: 0,
    location: '',
    address: '',
    postcode: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  }
  const [jobsData, setJobsData] = useState<JobsData>(initialJobData)
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const transformData = (data: BackendJobsDataType): JobsData => {
    return {
      id: data.id,
      images: data.image_url,
      description: data.description,
      budget: data.budget,
      date: data.created_at,
      location: data.state,
      clothingType: data.clothing_type,
      quotationCount: data.quotation_count,
      address: data.address,
      postcode: data.postcode,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      phoneNumber: data.phone_number,
    }
  }

  const {
    images,
    description,
    budget,
    date,
    clothingType,
    quotationCount,
    location,
    address,
    postcode,
    email,
    firstName,
    lastName,
    phoneNumber,
  } = jobsData
  useEffect(() => {
    //fech jobs data by id
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/jobs/${id}`
        )

        const jobCardData = transformData(response.data)

        setJobsData(jobCardData)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    }
    fetchData()
  }, [id])

  return (
    <Container
      maxWidth='sm'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '60px',
      }}
    >
      {isLoading && <Loading />}
      <Box sx={{ width: '50vh' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            width: '100%',
          }}
        >
          <Typography sx={{ color: '#8460c2', fontSize: '50px' }}>
            DETAILS
          </Typography>
          <Button
            variant='text'
            onClick={() => navigate(-1)}
            sx={{ color: '#8460c2' }}
          >
            <ArrowBackIcon /> Back
          </Button>
        </Box>

        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map((image, index) => (
                  <Box key={index}>
                    <img
                      src={image}
                      alt={`Job ${index + 1}`}
                      style={{ width: '100%', borderRadius: '5px' }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='body2'>Budget: ${budget}</Typography>
              <Typography variant='body2'>
                Clothing Type: {clothingType}
              </Typography>

              <Typography variant='body2'>
                Name: {firstName} {lastName}
              </Typography>
              <Typography variant='body2'>
                Address: {address}, {postcode},{location}
              </Typography>
              <Typography variant='body2'>Email: {email}</Typography>

              <Typography variant='body2'>Phone: {phoneNumber}</Typography>
              <Typography variant='body2'>date: {date.slice(0, 10)}</Typography>
              <Typography variant='body2'>
                Quotation Count: {quotationCount}
              </Typography>
              <Typography variant='body2' marginY='10px'>
                {description}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PrimaryButton
                  component='button'
                  name='SEND A QUOTE'
                  onClick={handleClickOpen}
                ></PrimaryButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <Quotation email={email} handleClose={handleClose} />
      </Dialog>
    </Container>
  )
}

export default JobDetails
