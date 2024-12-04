/* eslint-disable max-len */

'use server';

import { Book, Condition, Subject } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import cloudinary from 'cloudinary';
import { prisma } from './prisma';

/**
 * Handle condition conversion
 */
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
 * Upload the image to Cloudinary
 */
async function uploadImageToCloudinary(imagePath: string): Promise<string> {
  try {
    const uploadedImage = await cloudinary.v2.uploader.upload(imagePath);
    return uploadedImage.secure_url; // Return the secure URL
  } catch (error) {
    console.error('Error uploading image to Cloudinary', error);
    throw new Error('Image upload failed');
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

  // Upload the image if it exists
  let imageURL = '';
  if (book.image) {
    imageURL = await uploadImageToCloudinary(book.image); // Upload image and get URL
  }

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
 * Edits an existing stuff in the database.
 * @param book, an object with the following properties: title, isbn, subject, courseName, courseCrn, description, price, condition, imageURL, owner.
 */
export async function editBook(book: Book & { image?: string }) {
  const condition = getConditionValue(book.condition);
  const subject = getSubjectValue(book.subject);

  // Upload the image if it exists
  let imageURL = '';
  if (book.image) {
    imageURL = await uploadImageToCloudinary(book.image); // Upload image and get URL
  }

  // Update the book record in the database
  await prisma.book.update({
    where: { id: book.id },
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

  // Redirect to the buy page after editing the book
  redirect('/buy');
}

/**
 * Deletes an existing book from the database and optionally removes the image from Cloudinary.
 * @param id, the id of the book to delete.
 */
export async function deleteBook(id: number) {
  // Find the book to get the image URL (or public_id)
  const book = await prisma.book.findUnique({
    where: { id },
    select: { imageURL: true },
  });

  if (book && book.imageURL) {
    try {
      // Extract the public_id from the Cloudinary URL
      const publicId = book.imageURL.split('/').pop()?.split('.')[0];

      if (publicId) {
        // Delete the image from Cloudinary
        await cloudinary.v2.uploader.destroy(publicId);
        console.log(`Deleted image from Cloudinary: ${publicId}`);
      }
    } catch (error) {
      console.error('Error deleting image from Cloudinary', error);
    }
  }

  // Delete the book record from the database
  await prisma.book.delete({
    where: { id },
  });

  // Redirect to the buy page after deleting the book
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
