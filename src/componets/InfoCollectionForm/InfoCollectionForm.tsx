import React, { useState } from 'react'
import axios from 'axios'
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
  IconButton,
} from '@mui/material'

import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import PrimaryButton from '../PrimaryButton/PrimaryButton'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { FormData, InputOrSelectEvent } from '../../types/types'

const StyledFormControl = styled(FormControl)({
  marginBottom: '16px',
  width: '100%',
})

//input value
const formFields = [
  { label: 'First Name', field: 'first_name' as keyof FormData, type: 'text' },
  { label: 'Last Name', field: 'last_name' as keyof FormData, type: 'text' },
  {
    label: 'phone_number',
    field: 'phone_number' as keyof FormData,
    type: 'text',
  },
  { label: 'Email Address', field: 'email' as keyof FormData, type: 'text' },
  { label: 'Address', field: 'address' as keyof FormData, type: 'text' },
  { label: 'Postcode', field: 'postcode' as keyof FormData, type: 'text' },
]

//select value
const selectFields = [
  {
    label: 'State',
    field: 'state' as keyof FormData,
    options: ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'],
  },
  {
    label: 'Clothing Type',
    field: 'clothing_type' as keyof FormData,
    options: ['Dress', 'Sari', 'Blouse'],
  },
]

const InfoCollectionForm: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    address: '',
    postcode: '',
    state: '',
    clothing_type: '',
    description: '',
    budget: 0,
    images: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  //collect data from form
  const handleChange = (e: InputOrSelectEvent, field: keyof FormData) => {
    setFormData({ ...formData, [field]: e.target.value as string | number })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newUploadedImages = Array.from(e.target.files)
      setFormData({
        ...formData,
        images: [...formData.images, ...newUploadedImages],
      })
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      //submit data to backend
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/jobs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      alert('Form submitted successfully')
      navigate('/')
      setIsLoading(false)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Error submitting form')
    }
  }
  return (
    <Container maxWidth='sm'>
      {isLoading && <Loading />}
      <Box component='form' onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography
          variant='h4'
          gutterBottom
          sx={{ fontWeight: 300, color: '#8460c2' }}
        >
          Information Collection
        </Typography>

        {/* input box */}

        {formFields.map(({ label, field, type }) => (
          <StyledFormControl key={field}>
            <TextField
              data-testid={label}
              required
              fullWidth
              margin='normal'
              variant='outlined'
              label={label}
              type={type}
              value={formData[field]}
              onChange={(e) => handleChange(e, field)}
            />
          </StyledFormControl>
        ))}

        {/* select box */}

        {selectFields.map(({ label, field, options }) => (
          <StyledFormControl key={field}>
            <InputLabel required id='clothingType-label'>
              {label}
            </InputLabel>
            <Select
              labelId={`${field}-label`}
              value={formData[field]}
              onChange={(e) => handleChange(e, field)}
              label={label}
              data-testid={label}
            >
              {options.map((type) => (
                <MenuItem data-testid={type} key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        ))}

        {/* upload image button */}

        <StyledFormControl>
          <input
            id='images'
            name='images'
            type='file'
            required
            multiple
            accept='image/*'
            onChange={handleImageUpload}
            style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
          />
          <label htmlFor='images'>
            <Box sx={{ display: 'flex' }}>
              <PrimaryButton name='Upload Images' component='span' />
            </Box>
          </label>
        </StyledFormControl>
        <Box
          sx={{
            width: '100%',
            marginTop: 2,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {formData.images.map((file: File, index: number) => (
            <Box key={index} sx={{ position: 'relative' }}>
              <img
                src={URL.createObjectURL(file)}
                alt={`Uploaded ${index + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: 150,
                  objectFit: 'contain',
                  marginBottom: 8,
                }}
              />

              {/* delete image button */}

              <IconButton
                sx={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  color: '#8460c2',
                }}
                onClick={() =>
                  setFormData({
                    ...formData,
                    images: formData.images.filter((_, i) => i !== index),
                  })
                }
              >
                <HighlightOffIcon fontSize='large' />
              </IconButton>
            </Box>
          ))}
        </Box>

        <StyledFormControl>
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            label='Description'
            variant='outlined'
            value={formData.description}
            onChange={(e) => handleChange(e, 'description')}
          />
        </StyledFormControl>
        <StyledFormControl>
          <TextField
            fullWidth
            label='Budget (optional)'
            variant='outlined'
            type='number'
            value={formData.budget}
            onChange={(e) => handleChange(e, 'budget')}
          />
        </StyledFormControl>
        <Box sx={{ display: 'flex' }}>
          <PrimaryButton name='Submit' component='button' type='submit' />
        </Box>
      </Box>
    </Container>
  )
}

export default InfoCollectionForm
