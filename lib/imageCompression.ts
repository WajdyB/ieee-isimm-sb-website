// Image compression utility for client-side image optimization
// This helps reduce file sizes before upload to prevent 413 errors

interface CompressionOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  maxFileSize?: number // in bytes
}

const defaultOptions: CompressionOptions = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 0.8,
  maxFileSize: 5 * 1024 * 1024 // 5MB
}

export async function compressImage(
  file: File, 
  options: CompressionOptions = {}
): Promise<File> {
  const opts = { ...defaultOptions, ...options }
  
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = img
      const maxWidth = opts.maxWidth!
      const maxHeight = opts.maxHeight!
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }
      
      // Set canvas dimensions
      canvas.width = width
      canvas.height = height
      
      // Draw and compress image
      ctx!.drawImage(img, 0, 0, width, height)
      
      // Convert to blob with quality setting
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to compress image'))
            return
          }
          
          // If still too large, compress further
          if (blob.size > opts.maxFileSize!) {
            const furtherCompressedQuality = Math.max(0.1, opts.quality! * (opts.maxFileSize! / blob.size))
            canvas.toBlob(
              (finalBlob) => {
                if (!finalBlob) {
                  reject(new Error('Failed to compress image further'))
                  return
                }
                
                const compressedFile = new File([finalBlob], file.name, {
                  type: file.type,
                  lastModified: Date.now()
                })
                resolve(compressedFile)
              },
              file.type,
              furtherCompressedQuality
            )
          } else {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            })
            resolve(compressedFile)
          }
        },
        file.type,
        opts.quality
      )
    }
    
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = URL.createObjectURL(file)
  })
}

export async function compressImages(
  files: File[], 
  options: CompressionOptions = {}
): Promise<File[]> {
  const compressedFiles: File[] = []
  
  for (const file of files) {
    try {
      // Only compress if it's an image and larger than 1MB
      if (file.type.startsWith('image/') && file.size > 1024 * 1024) {
        const compressedFile = await compressImage(file, options)
        compressedFiles.push(compressedFile)
        console.log(`Compressed ${file.name}: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`)
      } else {
        compressedFiles.push(file)
      }
    } catch (error) {
      console.error(`Failed to compress ${file.name}:`, error)
      // If compression fails, use original file
      compressedFiles.push(file)
    }
  }
  
  return compressedFiles
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getTotalFileSize(files: File[]): number {
  return files.reduce((total, file) => total + file.size, 0)
} 