import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { Event, CreateEventRequest, ApiResponse } from '@/types/event'
import { verifyToken } from '@/lib/auth'

// Configure maximum payload size for events (reduced since images are now compressed)
const MAX_PAYLOAD_SIZE = 15 * 1024 * 1024 // 15MB in bytes

// GET /api/events - Get all events
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('ieee-isimm')
    const events = await db.collection('events')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    // Convert MongoDB ObjectIds to strings for the frontend
    const formattedEvents = events.map(event => ({
      ...event,
      _id: event._id.toString()
    }))

    return NextResponse.json<ApiResponse<Event[]>>({
      success: true,
      data: formattedEvents
    })

  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      message: 'Failed to fetch events'
    }, { status: 500 })
  }
}

// POST /api/events - Create new event
export async function POST(request: NextRequest) {
  try {
    // Verify admin token
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Unauthorized'
      }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Invalid token'
      }, { status: 401 })
    }

    // Check content length if available
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > MAX_PAYLOAD_SIZE) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: `Request payload too large. Maximum size is ${MAX_PAYLOAD_SIZE / (1024 * 1024)}MB`
      }, { status: 413 })
    }

    const body: CreateEventRequest = await request.json()
    const { title, description, date, location, attendees, images } = body

    // Validate required fields
    if (!title || !description || !date || !location || attendees === undefined) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'All fields are required'
      }, { status: 400 })
    }

    // Validate images array size
    if (images && images.length > 0) {
      const totalImageSize = images.reduce((total, image) => {
        // Estimate base64 size (roughly 4/3 of original size)
        return total + (image.length * 0.75)
      }, 0)

      if (totalImageSize > MAX_PAYLOAD_SIZE) {
        return NextResponse.json<ApiResponse>({
          success: false,
          message: `Total image data too large. Please reduce the number or size of images. Maximum size is ${MAX_PAYLOAD_SIZE / (1024 * 1024)}MB`
        }, { status: 413 })
      }

      console.log(`Creating event with ${images.length} images, estimated size: ${(totalImageSize / (1024 * 1024)).toFixed(2)}MB`)
    }

    const client = await clientPromise
    const db = client.db('ieee-isimm')
    
    const newEvent: Event = {
      title,
      description,
      date,
      location,
      attendees,
      images: images || [], // Use images from request body
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection('events').insertOne(newEvent)
    
    return NextResponse.json<ApiResponse<Event>>({
      success: true,
      data: { ...newEvent, _id: result.insertedId.toString() },
      message: `Event created successfully with ${images?.length || 0} images`
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating event:', error)
    
    // Check if it's a payload size error
    if (error instanceof Error && error.message.includes('too large')) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Request payload too large. Please reduce the number or size of images.'
      }, { status: 413 })
    }

    return NextResponse.json<ApiResponse>({
      success: false,
      message: 'Failed to create event. Please try again.'
    }, { status: 500 })
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
} 