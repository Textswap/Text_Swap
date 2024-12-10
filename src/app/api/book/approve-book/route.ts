/* eslint-disable import/prefer-default-export */
// src/app/api/book/approve-book/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

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

    // Revalidate multiple paths
    revalidatePath('/buy');
    revalidatePath('/');

    // Optional: Manual cache busting for Vercel
    if (process.env.VERCEL_REVALIDATION_TOKEN) {
      await fetch(`https://api.vercel.com/v1/projects/${process.env.VERCEL_PROJECT_ID}/deployments/revalidate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_REVALIDATION_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paths: ['/buy', '/'],
        }),
      });
    }

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.error('Error approving book:', error);
    return NextResponse.json({ error: 'Failed to approve book' }, { status: 500 });
  }
}
