/* eslint-disable import/prefer-default-export */

// src/app/api/listbooks/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'drikcnunl',
  api_key: '377153313932479',
  api_secret: '5iQKLeIwYBU8ojYTiv9XLwjKpq0',
});

function uploadImageToCloudinary(
  buffer: Buffer,
  folder: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (result?.secure_url) {
          return resolve(result.secure_url);
        }
        return reject(
          new Error('Failed to retrieve secure URL from Cloudinary response.'),
        );
      },
    );
    uploadStream.end(buffer);
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Validate required fields
    const requiredFields = [
      'title',
      'author',
      'isbn',
      'category',
      'price',
      'condition',
    ];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    // Parse and validate the price
    const price = parseFloat(formData.get('price') as string);
    if (Number.isNaN(price) || price < 0) {
      return NextResponse.json(
        { error: 'Invalid price value' },
        { status: 400 },
      );
    }

    // Prepare book data
    const bookData = {
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      isbn: formData.get('isbn') as string,
      category: formData.get('category') as string,
      courseName: formData.get('courseName') as string | null,
      courseCrn: formData.get('courseCrn') as string | null,
      price,
      condition: (formData.get('condition') as string)?.toLowerCase() as
        | 'excellent'
        | 'good'
        | 'fair'
        | 'poor',
    };

    // Handle image upload if present
    const imageFile = formData.get('image') as File | null;
    let imageUrl: string | null = null;

    if (imageFile) {
      try {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        imageUrl = await uploadImageToCloudinary(buffer, 'textswap');
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return NextResponse.json(
          { error: 'Failed to upload image to Cloudinary' },
          { status: 500 },
        );
      }
    }

    // Save the book data in the database
    const book = await prisma.book.create({
      data: {
        ...bookData,
        imageUrl,
        approved: false,
      },
    });

    // Return the newly created book
    return NextResponse.json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json(
      { error: 'Error creating book listing' },
      { status: 500 },
    );
  }
}
