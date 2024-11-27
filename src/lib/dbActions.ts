'use server';

import { Stuff, Book, Condition, Subject } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new book to the database.
 * @param book, an object with the following properties: title, isbn, subject, courseName, courseCrn, description, price, owner, condition, images.
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
  images?: string[];
}) {
  let condition: Condition = 'new';
  switch (book.condition) {
    case 'poor':
      condition = 'poor';
      break;
    case 'excellent':
      condition = 'excellent';
      break;
    case 'good':
      condition = 'good';
      break;
    case 'fair':
      condition = 'fair';
      break;
    default:
      condition = 'new';
      break;
  }

  let subject: Subject = 'other';
  switch (book.subject) {
    case 'math':
      subject = 'math';
      break;
    case 'english':
      subject = 'english';
      break;
    case 'science':
      subject = 'science';
      break;
    case 'history':
      subject = 'history';
      break;
    default:
      subject = 'other';
      break;
  }
  // Create the book
  const createdBook = await prisma.book.create({
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
    },
  });

  // Add images if any are provided
  if (book.images && book.images.length > 0) {
    for (const imagePath of book.images) {
      await prisma.bookImage.create({
        data: {
          bookId: createdBook.id,
          filePath: imagePath, // Store the image file path
        },
      });
    }
  }

  // After adding, redirect to the buy page
  redirect('/buy');
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editBook(book: Book & { images?: string[] }) {
  let condition: Condition = 'new';
  switch (book.condition) {
    case 'poor':
      condition = 'poor';
      break;
    case 'excellent':
      condition = 'excellent';
      break;
    case 'good':
      condition = 'good';
      break;
    case 'fair':
      condition = 'fair';
      break;
    default:
      condition = 'new';
      break;
  }
  let subject: Subject = 'other';
  switch (book.subject) {
    case 'math':
      subject = 'math';
      break;
    case 'english':
      subject = 'english';
      break;
    case 'science':
      subject = 'science';
      break;
    case 'history':
      subject = 'history';
      break;
    default:
      subject = 'other';
      break;
  }
  const updatedBook = await prisma.book.update({
    where: { id: book.id },
    data: {
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      subject,
      courseName: book.courseName,
      courseCrn: book.courseCrn,
      description: book.description,
      price: book.price,
      condition,
      owner: book.owner,
    },
  });
  // Handle images - Delete old images and add new ones if any
  if (book.images && book.images.length > 0) {
    // Delete all existing images for the book
    await prisma.bookImage.deleteMany({
      where: { bookId: book.id },
    });

    // Add new images
    for (const imagePath of book.images) {
      await prisma.bookImage.create({
        data: {
          bookId: updatedBook.id,
          filePath: imagePath, // Store the image file path
        },
      });
    }
  }
  redirect('/buy');
}

/**
 * Deletes an existing book from the database.
 * @param id, the id of the book to delete.
 */
export async function deleteBook(id: number) {
  // Delete associated images for the book
  await prisma.bookImage.deleteMany({
    where: { bookId: id },
  });

  // Delete the book record
  await prisma.book.delete({
    where: { id },
  });

  // After deleting, redirect to the list page
  redirect('/buy');
}

/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
    condition = 'fair';
  }
  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.stuff.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
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
