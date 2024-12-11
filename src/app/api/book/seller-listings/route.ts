/* eslint-disable import/prefer-default-export, @typescript-eslint/no-unused-vars */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth'; // Adjust based on your auth setup
import authOptions from '@/lib/authOptions';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Fetch session for current user
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = session.user.email;

    // Fetch books listed by the current account owner
    const books = await prisma.book.findMany({
      where: { owner: userEmail }, // Ensure "owner" matches the field storing user's email
    });

    if (books.length === 0) {
      return NextResponse.json({ message: 'No listings found' }, { status: 200 });
    }

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error('Error fetching seller listings:', error);
    return NextResponse.json({ error: 'Failed to fetch seller listings' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
