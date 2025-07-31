# Image Upload Configuration Guide

## Problem
You're getting a 413 "Content Too Large" error when uploading multiple images to your Vercel deployment. This happens because Vercel has a default payload size limit of 4MB for API routes.

## Solutions Implemented

### 1. Vercel Configuration (vercel.json)
- Created `vercel.json` to configure API route limits
- Increased function timeout to 30 seconds
- Added CORS headers for better compatibility

### 2. Next.js Configuration (next.config.mjs)
- Increased body parser size limit to 50MB
- Disabled response limit
- Added experimental configurations for better performance

### 3. Enhanced Upload API (app/api/upload/route.ts)
- Added file size validation (50MB per file, 100MB total)
- Better error handling and logging
- Support for multiple image formats (JPEG, PNG, GIF, WebP)
- Graceful handling of individual file failures
- CORS support with OPTIONS method

### 4. Alternative Cloud Storage API (app/api/upload-cloud/route.ts)
- Template for future cloud storage integration
- Can be extended with Cloudinary, AWS S3, or Firebase Storage

## Current Limits
- **Per file**: 50MB
- **Total upload**: 100MB
- **Supported formats**: JPEG, JPG, PNG, GIF, WebP

## Deployment Steps

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Fix image upload size limits"
   git push origin main
   ```

2. **Redeploy to Vercel:**
   - Your Vercel project will automatically redeploy
   - The new configuration will take effect

3. **Test the upload functionality:**
   - Try uploading multiple large images
   - Check the browser console for any errors
   - Verify that images are being processed correctly

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
3. Ensure you're using supported image formats
4. Check Vercel deployment logs for specific errors

### Performance issues?
1. Consider implementing client-side image compression
2. Use the cloud storage alternative for unlimited uploads
3. Implement lazy loading for large image galleries

### Need unlimited uploads?
1. Implement cloud storage integration (Cloudinary recommended)
2. Use external image hosting services
3. Consider CDN integration for better performance

## Monitoring
- Check Vercel function logs for upload performance
- Monitor API response times
- Track upload success/failure rates

## Security Notes
- All uploads require admin authentication
- File type validation prevents malicious uploads
- Size limits prevent abuse
- CORS headers are properly configured 