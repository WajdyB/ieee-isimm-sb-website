import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { ApiResponse } from '@/types/event'
import clientPromise from '@/lib/mongodb'
import { GridFSBucket } from 'mongodb'

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

    const client = await clientPromise
    const db = client.db('ieee-isimm')
    const bucket = new GridFSBucket(db, { bucketName: 'event-images' })
    const uploadedFiles: { url: string; id: string; filename: string }[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        console.warn(`Skipping non-image file: ${file.name} (${file.type})`)
        continue
      }
      
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        console.warn(`File ${file.name} is too large (${(file.size / 1024 / 1024).toFixed(2)}MB), skipping`)
        continue
      }

      try {
        // Read file buffer
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        
        // Store in GridFS
        const uploadStream = bucket.openUploadStream(file.name, {
          contentType: file.type
        })
        
        uploadStream.end(buffer)
        
        await new Promise((resolve, reject) => {
          uploadStream.on('finish', resolve)
          uploadStream.on('error', reject)
        })
        
        const id = uploadStream.id.toString()
        uploadedFiles.push({
          url: `/api/upload/${id}`,
          id,
          filename: file.name
        })
        
        console.log(`Successfully uploaded: ${file.name} (${(buffer.length / 1024).toFixed(2)}KB)`)
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError)
        // Continue with other files instead of failing completely
      }
    }

    if (uploadedFiles.length === 0) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'No valid image files were uploaded or all files were too large'
      }, { status: 400 })
    }

    return NextResponse.json<ApiResponse<{ files: { url: string; id: string; filename: string }[] }>>({
      success: true,
      data: { files: uploadedFiles },
      message: `Successfully uploaded ${uploadedFiles.length} image(s)`
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