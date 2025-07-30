export interface Event {
  _id?: string
  title: string
  description: string
  date: string
  location: string
  attendees: number
  images: string[]
  createdAt?: Date
  updatedAt?: Date
}

export interface CreateEventRequest {
  title: string
  description: string
  date: string
  location: string
  attendees: number
  images: string[]
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  token?: string
  message?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
} 