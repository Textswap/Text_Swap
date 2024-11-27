/* eslint-disable import/prefer-default-export */

// src/app/api/adminapproval/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      where: { approved: false },
    });

    return NextResponse.json(books, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
        'Surrogate-Control': 'no-store',
      },
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching pending books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      },
    );
  }
}
