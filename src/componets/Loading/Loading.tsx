import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../theme'

const Loading: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
      >
        <CircularProgress color='primary' />
      </div>
    </ThemeProvider>
  )
}

export default Loading
