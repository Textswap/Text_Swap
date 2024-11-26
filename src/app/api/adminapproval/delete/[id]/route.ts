/* eslint-disable import/prefer-default-export */

// src/app/api/adminapproval/delete/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'drikcnunl',
  api_key: '377153313932479',
  api_secret: '5iQKLeIwYBU8ojYTiv9XLwjKpq0',
});

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    console.log('Delete request received for ID:', id);

    if (!id) {
      console.error('No ID provided in the request.');
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const book = await prisma.book.findUnique({ where: { id } });
    console.log('Book fetched from database:', book);

    if (!book) {
      console.error('Book not found in database.');
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    let publicId = null;
    if (book.imageUrl) {
      // Extract everything after "/upload/" and before the file extension
      const matches = book.imageUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.[^/.]+$/);
      publicId = matches ? matches[1] : null;
    }
    console.log('Extracted public ID:', publicId);

    if (publicId) {
      const cloudinaryResult = await cloudinary.uploader.destroy(publicId);
      console.log('Cloudinary deletion result:', cloudinaryResult);
    }

    const deletedBook = await prisma.book.delete({ where: { id } });
    console.log('Deleted book from database:', deletedBook);

    return NextResponse.json({
      message: 'Book and image deleted successfully',
    });
  } catch (error) {
    console.error(
      'Error deleting book:',
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(
      {
        error: 'Failed to delete book',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
