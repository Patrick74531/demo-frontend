import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import JobCard from '../../componets/JobCard/JobCard'
import {
  Container,
  Grid,
  Button,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import Loading from '../../componets/Loading/Loading'
import { BackendJobsDataType, JobsData } from '../../types/types'

const MakerPage = () => {
  const [jobs, setJobs] = useState<JobsData[]>([])

  //locate the position of the button
  const [stateMenuAnchor, setStateMenuAnchor] = useState<null | HTMLElement>(
    null
  )
  const [typeMenuAnchor, setTypeMenuAnchor] = useState<null | HTMLElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  //get url
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const paramsState = searchParams.get('state')
  const paramsClothingType = searchParams.get('clothing_type')

  //update url when select different options
  const updateFilterInUrl = (
    newState: string | null,
    newType: string | null
  ) => {
    newState
      ? searchParams.set('state', newState)
      : searchParams.delete('state')
    newType
      ? searchParams.set('clothing_type', newType)
      : searchParams.delete('clothing_type')

    navigate(`/maker/jobs/filter?${searchParams.toString()}`)
  }

  //toggle the sort button
  const handleStateMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setStateMenuAnchor(event.currentTarget)
  }

  const handleStateMenuClose = () => {
    setStateMenuAnchor(null)
  }

  const handleTypeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setTypeMenuAnchor(event.currentTarget)
  }

  const handleTypeMenuClose = () => {
    setTypeMenuAnchor(null)
  }

  useEffect(() => {
    const fetchData = async () => {
      //fech data by state and clothing type
      try {
        setIsLoading(true)
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/jobs/filter?state=${paramsState}&clothing_type=${paramsClothingType}`
        )

        const jobCardData = response.data.map((item: BackendJobsDataType) => ({
          images: item.image_url,
          description: item.description,
          budget: item.budget,
          date: item.created_at,
          location: item.state,
          clothingType: item.clothing_type,
          quotationCount: item.quotation_count,
          id: item.id,
          address: item.address,
          postcode: item.postcode,
          email: item.email,
          firstName: item.first_name,
          lastName: item.last_name,
          phoneNumber: item.phone_number,
        }))
        setJobs(jobCardData)

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    }

    fetchData()
  }, [paramsState, paramsClothingType])

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Typography
          variant='h4'
          gutterBottom
          sx={{ fontWeight: 300, color: '#8460c2', margin: '30px 0' }}
        >
          ALL JOBS
        </Typography>

        <Typography
          variant='h6'
          gutterBottom
          sx={{ fontWeight: 300, color: '#8460c2' }}
        >
          SORTS:
          <Button
            variant='text'
            sx={{ color: '#8460c2' }}
            onClick={handleStateMenuOpen}
          >
            LOCATION
          </Button>
          <Menu
            anchorEl={stateMenuAnchor}
            open={Boolean(stateMenuAnchor)}
            onClose={handleStateMenuClose}
          >
            {['ALL', 'NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'].map(
              (state) => (
                <MenuItem
                  key={state}
                  onClick={() => {
                    updateFilterInUrl(state, paramsClothingType)
                    handleStateMenuClose()
                  }}
                >
                  {state}
                </MenuItem>
              )
            )}
          </Menu>
          |
          <Button
            variant='text'
            sx={{ color: '#8460c2' }}
            onClick={handleTypeMenuOpen}
          >
            TYPES
          </Button>
          <Menu
            anchorEl={typeMenuAnchor}
            open={Boolean(typeMenuAnchor)}
            onClose={handleTypeMenuClose}
          >
            {['ALL', 'Dress', 'Sari', 'Blouse'].map((type) => (
              <MenuItem
                key={type}
                onClick={() => {
                  updateFilterInUrl(paramsState, type)
                  handleTypeMenuClose()
                }}
              >
                {type}
              </MenuItem>
            ))}
          </Menu>
        </Typography>
      </Box>
      {isLoading ? (
        <Loading />
      ) : (
        <Grid container spacing={4} justifyContent='center'>
          {jobs.map((jobsData) => (
            <Grid key={jobsData.id} item xs={12} sm={6} md={6} lg={4}>
              <JobCard jobCardData={jobsData} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default MakerPage
