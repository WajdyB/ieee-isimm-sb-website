import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { ApiResponse } from '@/types/event'

// Simple upload that converts images to smaller base64 strings
// This approach avoids the complex compression and size issues

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
        // Simple approach: Convert to base64 but limit size
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        // If file is too large, skip it with a warning
        if (buffer.length > 2 * 1024 * 1024) { // 2MB limit
          console.warn(`File ${file.name} is too large (${(buffer.length / 1024 / 1024).toFixed(2)}MB), skipping`)
          continue
        }

        // Convert to Base64
        const base64String = buffer.toString('base64')
        const dataUrl = `data:${file.type};base64,${base64String}`
        
        uploadedUrls.push(dataUrl)
        console.log(`Successfully processed: ${file.name} (${(buffer.length / 1024).toFixed(2)}KB)`)
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError)
        // Continue with other files instead of failing completely
      }
    }

    if (uploadedUrls.length === 0) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'No valid image files were uploaded or all files were too large'
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