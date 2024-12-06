/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest) {
  try {
    const { bookId }: { bookId?: number } = await request.json();

    if (!bookId) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: { approved: true },
    });

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.error('Error approving book:', error);
    return NextResponse.json({ error: 'Failed to approve book' }, { status: 500 });
  }
}
