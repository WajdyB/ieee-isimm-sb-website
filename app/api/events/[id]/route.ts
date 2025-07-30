import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import { ApiResponse } from '@/types/event'
import { verifyToken } from '@/lib/auth'

// DELETE /api/events/[id] - Delete event by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params

    if (!id) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Event ID is required'
      }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('ieee-isimm')
    
    const result = await db.collection('events').deleteOne({
      _id: new ObjectId(id)
    })

    if (result.deletedCount === 0) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Event not found'
      }, { status: 404 })
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Event deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      message: 'Failed to delete event'
    }, { status: 500 })
  }
} 