import { Button, ThemeProvider } from '@mui/material'
import { FC } from 'react'
import theme from '../../theme'
import { PrimaryButtonType } from '../../types/types'

const PrimaryButton: FC<PrimaryButtonType> = ({
  component,
  name,
  path,
  type,
  onClick,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant='contained'
        component={component}
        to={path}
        type={type}
        onClick={onClick}
        sx={{
          margin: '8px',
          padding: '10px 20px ',
          borderRadius: '25px',
          textDecoration: 'none',
          width: '100%',
          '&:hover': {
            backgroundColor: 'white',
            color: '#8460c2',
          },
        }}
        color='primary'
      >
        {name}
      </Button>
    </ThemeProvider>
  )
}

export default PrimaryButton
