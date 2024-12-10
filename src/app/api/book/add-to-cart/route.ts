/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    const { bookId } = await request.json();

    if (!bookId) {
      return NextResponse.json({ message: 'Book ID is required' }, { status: 400 });
    }

    const user = session.user as { id: string } & typeof session.user;

    if (!user || !user.id) {
      return NextResponse.json({ message: 'User ID not found' }, { status: 400 });
    }

    const userId = Number(user.id);

    // Fetch the book to check if the current user is the owner
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: { owner: true },
    });

    if (!book) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    // Check if the user is trying to add their own book
    if (book.owner === user.email) {
      return NextResponse.json({ message: 'You cannot add your own book to the cart' }, { status: 400 });
    }

    // Check if the book is in the user's cart
    const existingSavedBook = await prisma.savedBook.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });

    if (existingSavedBook) {
      return NextResponse.json({ message: 'This book is already in your cart' }, { status: 409 });
    }

    // Add the book to the cart
    const savedBook = await prisma.savedBook.create({
      data: {
        userId,
        bookId,
      },
    });

    return NextResponse.json(savedBook, { status: 200 });
  } catch (error) {
    console.error('Error adding book to saved books:', error);

    return NextResponse.json(
      {
        message: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
