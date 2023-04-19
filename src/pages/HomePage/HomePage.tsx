import { Typography, Box, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import PrimaryButton from '../../componets/PrimaryButton/PrimaryButton'

const HomePage = () => {
  return (
    <Container maxWidth='md'>
      <Box sx={{ padding: 4 }}>
        <Typography variant='h2' gutterBottom color='#8460c2'>
          where slow fashion clients and makers meet!
        </Typography>
        <Typography variant='h5' gutterBottom sx={{ color: '#726A84' }}>
          Join the fastest growing slow fashion platform where makers take
          control of their career and clients have access to the most diverse
          talent.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 20 },
            marginTop: '40px',
          }}
        >
          <PrimaryButton
            component={Link}
            path='maker/jobs/filter?clothing_type=ALL&state=ALL'
            name='Maker'
          />
          <PrimaryButton
            component={Link}
            path='customer'
            name='I need a Maker'
          />
        </Box>
      </Box>
    </Container>
  )
}

export default HomePage
