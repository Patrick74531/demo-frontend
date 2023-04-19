import { SelectChangeEvent } from '@mui/material'

export interface FormData {
  first_name: string
  last_name: string
  phone_number: string
  email: string
  address: string
  postcode: string
  clothing_type: string
  images: File[]
  description: string
  budget: number
  state: string
}

export interface JobsData {
  id: number
  images: string[]
  description: string
  budget: number
  date: string
  location: string
  clothingType: string
  quotationCount: number
  address: string
  postcode: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
}

export interface BackendJobsDataType {
  id: number
  image_url: string[]
  description: string
  budget: number
  created_at: string
  clothing_type: string
  quotation_count: number
  state: string
  address: string
  postcode: string
  email: string
  first_name: string
  last_name: string
  phone_number: string
}

export interface JobCardProps {
  jobCardData: JobsData
}

export interface PrimaryButtonType {
  component: any
  name: string
  path?: string
  type?: string
  onClick?: () => void
}

export interface QuotationFormData {
  price: number
  comments: string
  email: string
  jobId: number
}

export type InputEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>

export interface QuotationProps {
  email: string
  handleClose: () => void
}

export type InputOrSelectEvent =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | SelectChangeEvent<string | number | File[]>
