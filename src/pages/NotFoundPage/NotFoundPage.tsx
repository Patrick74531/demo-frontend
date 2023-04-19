import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../theme'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography variant='h1' component='h1' gutterBottom>
          404
        </Typography>
        <Typography variant='h4' component='h2' gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant='body1' component='p' gutterBottom>
          The page you are looking for does not exist. It may have been moved or
          removed.
        </Typography>
        <Button variant='contained' color='primary' onClick={handleGoHome}>
          Go Home
        </Button>
      </Box>
    </ThemeProvider>
  )
}

export default NotFoundPage
