import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface AdminUser {
  email: string
  password: string
}

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12)
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

export const generateToken = (email: string): string => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '24h' })
}

export const verifyToken = (token: string): { email: string } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string }
  } catch {
    return null
  }
}

export const authenticateAdmin = async (email: string, password: string): Promise<boolean> => {
  // In a real app, you'd fetch from database
  // For now, using environment variables
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@ieee-isimm.org'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  
  if (email !== adminEmail) {
    return false
  }
  
  return await verifyPassword(password, await hashPassword(adminPassword))
} 