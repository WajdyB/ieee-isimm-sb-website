import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { ApiResponse } from '@/types/event'

// Configure maximum file size (5MB per file after compression)
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes
const MAX_TOTAL_SIZE = 25 * 1024 * 1024 // 25MB total limit

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

    // Validate file sizes
    let totalSize = 0
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json<ApiResponse>({
          success: false,
          message: `File ${file.name} is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`
        }, { status: 413 })
      }
      totalSize += file.size
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: `Total upload size is too large. Maximum total size is ${MAX_TOTAL_SIZE / (1024 * 1024)}MB`
      }, { status: 413 })
    }

    const uploadedFiles: string[] = []
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

    for (const file of files) {
      if (!validImageTypes.includes(file.type)) {
        console.warn(`Skipping non-image file: ${file.name} (${file.type})`)
        continue
      }

      try {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Convert to Base64
        const base64String = buffer.toString('base64')
        const dataUrl = `data:${file.type};base64,${base64String}`
        
        uploadedFiles.push(dataUrl)
        console.log(`Successfully processed: ${file.name} (${(file.size / 1024).toFixed(2)}KB)`)
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError)
        // Continue with other files instead of failing completely
      }
    }

    if (uploadedFiles.length === 0) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'No valid image files were uploaded'
      }, { status: 400 })
    }

    return NextResponse.json<ApiResponse<string[]>>({
      success: true,
      data: uploadedFiles,
      message: `Successfully uploaded ${uploadedFiles.length} image(s)`
    })

  } catch (error) {
    console.error('Error uploading files:', error)
    
    // Check if it's a payload size error
    if (error instanceof Error && error.message.includes('too large')) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Upload size too large. Please reduce the number or size of images.'
      }, { status: 413 })
    }

    return NextResponse.json<ApiResponse>({
      success: false,
      message: 'Failed to upload files. Please try again.'
    }, { status: 500 })
  }
}

// Handle OPTIONS request for CORS
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