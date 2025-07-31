# Image Upload Configuration Guide

## Problem
You're getting a 413 "Content Too Large" error when uploading multiple images to your Vercel deployment. This happens because Vercel has a default payload size limit of 4MB for API routes.

## Solutions Implemented

### 1. Vercel Configuration (vercel.json)
- Created `vercel.json` to configure API route limits
- Increased function timeout to 30 seconds for all API routes
- Added CORS headers for better compatibility
- Configured both `/api/upload` and `/api/events` endpoints

### 2. Next.js Configuration (next.config.mjs)
- Increased body parser size limit to 50MB
- Disabled response limit
- Added experimental configurations for better performance

### 3. Enhanced Upload API (app/api/upload/route.ts)
- Added file size validation (10MB per file, 50MB total after compression)
- Better error handling and logging
- Support for multiple image formats (JPEG, PNG, GIF, WebP)
- Graceful handling of individual file failures
- CORS support with OPTIONS method

### 4. Enhanced Events API (app/api/events/route.ts)
- Added payload size validation (25MB total after compression)
- Better error handling for large image arrays
- Image count and size estimation
- CORS support with OPTIONS method

### 5. Alternative Event Creation API (app/api/events/create/route.ts)
- Dedicated endpoint for event creation with large image arrays
- Limits to 20 images per event to prevent issues
- Optimized for handling multiple images

### 6. Client-Side Image Compression (lib/imageCompression.ts)
- Automatic image compression before upload
- Reduces file sizes by up to 80% while maintaining quality
- Supports multiple image formats
- Configurable compression settings
- Prevents 413 errors with large images

### 7. Alternative Cloud Storage API (app/api/upload-cloud/route.ts)
- Template for future cloud storage integration
- Can be extended with Cloudinary, AWS S3, or Firebase Storage

## Current Limits
- **Per file**: 10MB (after compression)
- **Total upload**: 50MB (after compression)
- **Event creation**: 25MB total payload (after compression)
- **Images per event**: 20 maximum
- **Supported formats**: JPEG, JPG, PNG, GIF, WebP
- **Compression**: Automatic client-side compression for files > 1MB

## Deployment Steps

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Fix image upload and event creation size limits"
   git push origin main
   ```

2. **Redeploy to Vercel:**
   - Your Vercel project will automatically redeploy
   - The new configuration will take effect

3. **Test the functionality:**
   - Try uploading multiple large images
   - Create events with many images
   - Check the browser console for any errors
   - Verify that images are being processed correctly

## API Endpoints

### Upload Images
- **POST** `/api/upload` - Upload images separately
- **POST** `/api/upload-cloud` - Cloud storage upload (template)

### Create Events
- **POST** `/api/events` - Create event with images (enhanced)
- **POST** `/api/events/create` - Dedicated event creation endpoint

## Future Improvements

### Option 1: Cloud Storage Integration
For unlimited storage and better performance, consider integrating with:

**Cloudinary (Recommended for images):**
```bash
npm install cloudinary
```

**AWS S3:**
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

**Firebase Storage:**
```bash
npm install firebase
```

### Option 2: Image Optimization
- Implement client-side image compression before upload
- Use WebP format for better compression
- Add image resizing options

### Option 3: Chunked Uploads
- Split large uploads into smaller chunks
- Implement progress tracking
- Resume upload functionality

## Troubleshooting

### Still getting 413 errors?
1. Check if you're uploading more than 100MB total
2. Verify individual files are under 50MB
3. Ensure event payload is under 50MB
4. Limit images to 20 per event
5. Ensure you're using supported image formats
6. Check Vercel deployment logs for specific errors

### Performance issues?
1. Consider implementing client-side image compression
2. Use the cloud storage alternative for unlimited uploads
3. Implement lazy loading for large image galleries
4. Use the dedicated `/api/events/create` endpoint

### Need unlimited uploads?
1. Implement cloud storage integration (Cloudinary recommended)
2. Use external image hosting services
3. Consider CDN integration for better performance

## Monitoring
- Check Vercel function logs for upload performance
- Monitor API response times
- Track upload success/failure rates
- Monitor event creation performance

## Security Notes
- All uploads require admin authentication
- File type validation prevents malicious uploads
- Size limits prevent abuse
- CORS headers are properly configured
- Image count limits prevent resource exhaustion 