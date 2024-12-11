/* eslint-disable import/prefer-default-export */

// src/app/api/book/buy-page/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // Ensure fresh data on each request
export const revalidate = 0; // Disable caching

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      where: {
        approved: true,
      },
    });

    // Add cache-busting headers
    const response = NextResponse.json(books);
    response.headers.set('Cache-Control', 'no-store, max-age=0');

    return response;
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error fetching books' }, { status: 500 });
  }
}
