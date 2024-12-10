/* eslint-disable max-len */

'use server';

import { Condition, Subject } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Checks if a user exists in the database by email.
 * @param email The email to check.
 * @returns True if the user exists, otherwise false.
 */
export async function checkUserExists(email: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user !== null;
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw new Error('Could not check user existence.');
  }
}

function getConditionValue(condition: string): Condition {
  switch (condition) {
    case 'poor':
      return 'poor';
    case 'excellent':
      return 'excellent';
    case 'good':
      return 'good';
    case 'fair':
      return 'fair';
    default:
      return 'new';
  }
}

/**
 * Handle subject conversion
 */
function getSubjectValue(subject: string): Subject {
  switch (subject) {
    case 'math':
      return 'math';
    case 'english':
      return 'english';
    case 'science':
      return 'science';
    case 'history':
      return 'history';
    default:
      return 'other';
  }
}

/**
 * Adds a new book to the database.
 * @param book, an object with the following properties: title, isbn, subject, courseName, courseCrn, description, price, condition, imageURL, owner.
 */
export async function addBook(book: {
  title: string;
  isbn?: string;
  subject: string;
  courseName?: string;
  courseCrn?: string;
  description?: string;
  price: number;
  owner: string;
  condition: string;
  image?: string;
}) {
  const condition = getConditionValue(book.condition);
  const subject = getSubjectValue(book.subject);

  const imageURL = '';

  // Create the book in the database
  await prisma.book.create({
    data: {
      title: book.title,
      isbn: book.isbn,
      subject,
      courseName: book.courseName,
      courseCrn: book.courseCrn,
      description: book.description,
      price: book.price,
      condition,
      owner: book.owner,
      imageURL: imageURL || '',
    },
  });
  // Redirect to the buy page after adding the book
  redirect('/buy');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
