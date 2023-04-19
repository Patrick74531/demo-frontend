import React, { FC, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Container,
  FormControl,
  TextField,
  Typography,
  styled,
} from '@mui/material'
import PrimaryButton from '../PrimaryButton/PrimaryButton'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import {
  InputEvent,
  QuotationFormData,
  QuotationProps,
} from '../../types/types'
const StyledFormControl = styled(FormControl)({
  marginBottom: '16px',
  width: '100%',
})

const Quotation: FC<QuotationProps> = ({ email, handleClose }) => {
  const param = useParams()
  const id = Number(param.id)
  const [formData, setFormData] = useState<QuotationFormData>({
    price: 0,
    comments: '',
    email: email,
    jobId: id,
  })
  const [isLoading, setIsLoading] = useState(false)

  //collect data
  const handleChange = (e: InputEvent, field: keyof QuotationFormData) => {
    setFormData({ ...formData, [field]: e.target.value as string | number })
  }

  //submit quotation data to backend and increment the number of quotation
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/quotes`, formData)

      alert('Sending quotation successfully')
      setIsLoading(false)
      handleClose()
    } catch (error) {
      console.error('Error sending quotation:', error)
      alert('Error sending quotation')
    }
  }
  return (
    <Container maxWidth='sm'>
      <Box component='form' onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography
          variant='h4'
          gutterBottom
          sx={{ fontWeight: 300, color: '#8460c2' }}
        >
          QUOTATION
        </Typography>

        <StyledFormControl>
          <TextField
            required
            fullWidth
            margin='normal'
            variant='outlined'
            label='price'
            type='number'
            value={formData['price']}
            onChange={(e) => handleChange(e, 'price')}
          />
        </StyledFormControl>

        <StyledFormControl>
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            label='comments'
            variant='outlined'
            value={formData['comments']}
            onChange={(e) => handleChange(e, 'comments')}
          />
        </StyledFormControl>
        <Box sx={{ display: 'flex' }}>
          {isLoading && <Loading />}
          <PrimaryButton name='Submit' component='button' type='submit' />
        </Box>
      </Box>
    </Container>
  )
}

export default Quotation
