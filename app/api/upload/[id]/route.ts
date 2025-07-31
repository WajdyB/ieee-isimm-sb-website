import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { GridFSBucket, ObjectId } from 'mongodb'

type Context = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, context: Context) {
  try {
    const params = 'then' in context.params ? await context.params : context.params;
    const id = params.id;
    
    if (!id || typeof id !== 'string') {
      return new Response('Invalid image id', { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('ieee-isimm');
    const bucket = new GridFSBucket(db, { bucketName: 'event-images' });
    
    const _id = new ObjectId(id);
    const files = await db.collection('event-images.files').find({ _id }).toArray();
    
    if (!files || files.length === 0) {
      return new Response('Image not found', { status: 404 });
    }
    
    const file = files[0];
    const stream = bucket.openDownloadStream(_id);
    
    return new Response(stream as any, {
      headers: {
        'Content-Type': file.contentType || 'application/octet-stream',
        'Content-Disposition': `inline; filename="${file.filename}"`,
        'Cache-Control': 'public, max-age=31536000' // Cache for 1 year
      }
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return new Response('Error fetching image', { status: 500 });
  }
} 