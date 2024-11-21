/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id, 10);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 });
    }

    // Delete the book
    await prisma.book.delete({
      where: { id: id.toString() },
    });

    return NextResponse.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json(
      { error: 'Failed to delete book' },
      { status: 500 },
    );
  }
}
