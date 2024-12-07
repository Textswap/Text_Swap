/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      where: {
        approved: true,
      },
    });
    return NextResponse.json(books);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error fetching books' }, { status: 500 });
  }
}
