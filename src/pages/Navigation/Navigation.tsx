import { Fragment } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Outlet, Link } from 'react-router-dom'

const NavigationBar = () => {
  const buttonData = [
    { title: 'Maker', path: '/maker/jobs/filter?clothing_type=ALL&state=ALL' },
    { title: 'I need a Maker', path: '/customer' },
  ]

  return (
    <Fragment>
      <AppBar position='static' sx={{ backgroundColor: '#8460c2' }}>
        <Toolbar>
          <Typography
            component={Link}
            to='/'
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              marginLeft: { xs: '0', sm: '60px' },
            }}
            aria-label='Home'
          >
            <img
              alt='logo'
              src='https://meyd.it/img/core-img/white_logo.png'
              style={{ width: '60px' }}
            />
          </Typography>
          {buttonData.map(({ title, path }) => (
            <Button
              key={title}
              color='inherit'
              component={Link}
              to={path}
              sx={{ fontWeight: 600 }}
              aria-label={title}
            >
              {title}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Fragment>
  )
}

export default NavigationBar
