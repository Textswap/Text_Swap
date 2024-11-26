/* eslint-disable import/prefer-default-export */

// src/app/api/adminapproval/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      where: { approved: false },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching pending books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 },
    );
  }
}
