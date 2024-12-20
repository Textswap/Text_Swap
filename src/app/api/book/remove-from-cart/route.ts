/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: NextRequest) {
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

    // Check if the book is in the user's cart
    const existingSavedBook = await prisma.savedBook.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });

    if (!existingSavedBook) {
      return NextResponse.json({ message: 'Book not found in cart' }, { status: 409 });
    }

    // Remove the book from the cart
    await prisma.savedBook.delete({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });

    return NextResponse.json({ message: 'Book removed from cart' }, { status: 200 });
  } catch (error) {
    console.error('Error removing book from cart:', error);

    return NextResponse.json(
      {
        message: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
