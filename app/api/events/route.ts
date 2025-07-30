import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { Event, CreateEventRequest, ApiResponse } from '@/types/event'
import { verifyToken } from '@/lib/auth'

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

    const body: CreateEventRequest = await request.json()
    const { title, description, date, location, attendees, images } = body

    // Validate required fields
    if (!title || !description || !date || !location || attendees === undefined) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'All fields are required'
      }, { status: 400 })
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
      data: { ...newEvent, _id: result.insertedId.toString() }
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      message: 'Failed to create event'
    }, { status: 500 })
  }
} 