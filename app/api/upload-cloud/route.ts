import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { ApiResponse } from '@/types/event'

// This is an alternative approach using cloud storage
// You can integrate with services like Cloudinary, AWS S3, or Firebase Storage
// For now, this serves as a template for future implementation

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

    const uploadedUrls: string[] = []
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

    for (const file of files) {
      if (!validImageTypes.includes(file.type)) {
        console.warn(`Skipping non-image file: ${file.name} (${file.type})`)
        continue
      }

      try {
        // TODO: Implement cloud storage upload here
        // Example with Cloudinary:
        // const cloudinary = require('cloudinary').v2
        // const result = await cloudinary.uploader.upload(file)
        // uploadedUrls.push(result.secure_url)
        
        // For now, fallback to base64 (same as original upload)
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64String = buffer.toString('base64')
        const dataUrl = `data:${file.type};base64,${base64String}`
        
        uploadedUrls.push(dataUrl)
        console.log(`Successfully processed: ${file.name} (${(file.size / 1024).toFixed(2)}KB)`)
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError)
      }
    }

    if (uploadedUrls.length === 0) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'No valid image files were uploaded'
      }, { status: 400 })
    }

    return NextResponse.json<ApiResponse<string[]>>({
      success: true,
      data: uploadedUrls,
      message: `Successfully uploaded ${uploadedUrls.length} image(s)`
    })

  } catch (error) {
    console.error('Error uploading files:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      message: 'Failed to upload files. Please try again.'
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