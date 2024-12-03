import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// eslint-disable-next-line import/prefer-default-export
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const bookId = parseInt(params.id, 10); // Convert string to number

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        images: true,
      },
    });

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json({ error: 'Failed to fetch book details' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
