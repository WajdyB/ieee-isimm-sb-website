import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { ApiResponse } from '@/types/event'

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

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'No files uploaded'
      }, { status: 400 })
    }

    const uploadedFiles: string[] = []

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        continue // Skip non-image files
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Convert to Base64
      const base64String = buffer.toString('base64')
      const dataUrl = `data:${file.type};base64,${base64String}`
      
      uploadedFiles.push(dataUrl)
    }

    return NextResponse.json<ApiResponse<string[]>>({
      success: true,
      data: uploadedFiles
    })

  } catch (error) {
    console.error('Error uploading files:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      message: 'Failed to upload files'
    }, { status: 500 })
  }
} 