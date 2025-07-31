import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { Event, CreateEventRequest, ApiResponse } from '@/types/event'
import { verifyToken } from '@/lib/auth'

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

    // Validate images array size (limit to 20 images to prevent issues)
    if (images && images.length > 20) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Maximum 20 images allowed per event'
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
      images: images || [],
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

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
} 