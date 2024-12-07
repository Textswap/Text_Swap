/* eslint-disable import/prefer-default-export */

// src/app/api/adminapproval/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { notifyClients } from './stream'; // Import notifyClients from stream.ts

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

// Handle approval (you can modify the approval action based on your logic)
export async function POST(request: Request) {
  const { id } = await request.json();
  try {
    // Assuming approval updates the book status
    await prisma.book.update({
      where: { id },
      data: { approved: true },
    });

    // Notify clients about the approval
    notifyClients({ action: 'approve', id });

    return NextResponse.json({ message: 'Book approved' }, { status: 200 });
  } catch (error) {
    console.error('Error approving book:', error);
    return NextResponse.json({ error: 'Failed to approve book' }, { status: 500 });
  }
}

// Handle delete
export async function DELETE(request: Request) {
  const { id } = await request.json();
  try {
    await prisma.book.delete({
      where: { id },
    });

    // Notify clients about the deletion
    notifyClients({ action: 'delete', id });

    return NextResponse.json({ message: 'Book deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
  }
}
