/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({
      email: session.user.email,
      role: session.user.name || 'user', // Assuming `role` is part of your user data
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json({ error: 'Failed to fetch user details' }, { status: 500 });
  }
}
