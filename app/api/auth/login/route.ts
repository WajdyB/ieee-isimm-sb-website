import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin, generateToken } from '@/lib/auth'
import { LoginRequest, LoginResponse } from '@/types/event'

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json<LoginResponse>({
        success: false,
        message: 'Email and password are required'
      }, { status: 400 })
    }

    const isValid = await authenticateAdmin(email, password)

    if (!isValid) {
      return NextResponse.json<LoginResponse>({
        success: false,
        message: 'Invalid email or password'
      }, { status: 401 })
    }

    const token = generateToken(email)

    return NextResponse.json<LoginResponse>({
      success: true,
      token
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json<LoginResponse>({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
} 