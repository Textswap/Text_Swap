/* eslint-disable import/prefer-default-export */

// src/app/api/adminapproval/approve/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id, 10);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: 'Invalid book ID' }, { status: 400 });
    }

    // Approve the book
    await prisma.book.update({
      where: { id: id.toString() },
      data: { approved: true },
    });

    return NextResponse.json({ message: 'Book approved successfully' });
  } catch (error) {
    console.error('Error approving book:', error);
    return NextResponse.json(
      { error: 'Failed to approve book' },
      { status: 500 },
    );
  }
}
