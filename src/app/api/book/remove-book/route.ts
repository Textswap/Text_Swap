/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: NextRequest) {
  try {
    const { bookId }: { bookId?: number } = await request.json();

    if (!bookId) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    const bookExists = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!bookExists) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    await prisma.savedBook.deleteMany({
      where: { bookId },
    });

    // Delete the book
    const removedBook = await prisma.book.delete({
      where: { id: bookId },
    });

    return NextResponse.json(removedBook, { status: 200 });
  } catch (error) {
    console.error('Error removing book:', error);
    return NextResponse.json({ error: 'Failed to remove book' }, { status: 500 });
  }
}
