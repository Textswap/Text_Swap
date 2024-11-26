/* eslint-disable import/prefer-default-export */

// src/app/api/adminapproval/approve/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    // Approve the textbook by updating the `approved` field to `true`
    const updatedBook = await prisma.book.update({
      where: { id }, // Use `id` as a string
      data: { approved: true },
    });

    return NextResponse.json({
      message: 'Book approved successfully',
      book: updatedBook,
    });
  } catch (error) {
    console.error('Error approving book:', error);
    return NextResponse.json(
      { error: 'Failed to approve book' },
      { status: 500 },
    );
  }
}
