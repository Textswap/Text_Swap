/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    // Destructure the book data
    const { title, isbn, subject, courseName, courseCrn, description, price, condition, owner } = body;

    // Validate the incoming data (basic check)
    if (!title || !subject || !price || !condition || !owner) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert the book into the database
    const newBook = await prisma.book.create({
      data: {
        title,
        isbn,
        subject,
        courseName,
        courseCrn,
        description,
        price,
        condition,
        owner,
        approved: false,
        imageURL: '',
      },
    });

    // Return success response
    return NextResponse.json(
      {
        message: 'Book added successfully!',
        bookId: newBook.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error adding book:', error);
    return NextResponse.json(
      {
        error: 'An error occurred while adding the book.',
      },
      { status: 500 },
    );
  }
}
