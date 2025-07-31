// API helper functions for events management
import { Event } from '@/types/event'

export interface EventData {
  title: string
  description: string
  date: string
  location: string
  attendees: number
  images: string[]
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
}

// Get all events
export async function getEvents(): Promise<ApiResponse<Event[]>> {
  try {
    const response = await fetch('/api/events')
    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch events'
    }
  }
}

// Create new event
export async function createEvent(eventData: EventData): Promise<ApiResponse<Event>> {
  try {
    const token = localStorage.getItem('adminToken')
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create event'
    }
  }
}

// Delete event
export async function deleteEvent(id: string): Promise<ApiResponse> {
  try {
    const token = localStorage.getItem('adminToken')
    const response = await fetch(`/api/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: 'Failed to delete event'
    }
  }
}

// Upload images
export async function uploadImages(files: File[]): Promise<ApiResponse<{ files: { url: string; id: string; filename: string }[] }>> {
  try {
    const token = localStorage.getItem('adminToken')
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })

    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: 'Failed to upload images'
    }
  }
}

// Admin login
export async function loginAdmin(credentials: { email: string; password: string }): Promise<ApiResponse<{ token: string }>> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: 'Login failed'
    }
  }
} 