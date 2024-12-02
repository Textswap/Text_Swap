/* eslint-disable import/prefer-default-export */

// src/app/api/adminapproval/approve/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { notifyClients } from '../../stream'; // Ensure this import path is correct

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const updatedBook = await prisma.book.update({
      where: { id },
      data: { approved: true },
    });

    // Notify all clients of the update
    notifyClients(updatedBook);

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
