/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

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
        const fileName = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });
        const imagePath = path.join(uploadDir, fileName);
        await writeFile(imagePath, buffer);
        imageUrl = `/uploads/${fileName}`;
      } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json(
          { error: 'Failed to upload image' },
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
    console.error('Error creating book:', error); // Log the exact error
    return NextResponse.json(
      { error: 'Error creating book listing' },
      { status: 500 },
    );
  }
}
