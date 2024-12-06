import { PrismaClient, Role, Condition, Subject } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  // Create users using forEach
  await Promise.all(
    config.defaultAccounts.map(async (account) => {
      const password = await hash('changeme', 10);
      let role: Role = 'USER';
      if (account.role === 'ADMIN') {
        role = 'ADMIN';
      }
      console.log(`  Creating user: ${account.email} with role: ${role}`);
      await prisma.user.upsert({
        where: { email: account.email },
        update: {},
        create: {
          id: account.id,
          email: account.email,
          password,
          role,
        },
      });
    }),
  );
  // Create books using forEach
  await Promise.all(
    config.defaultBooks.map(async (book) => {
      let subject: Subject = 'other';
      switch (book.subject) {
        case 'math':
          subject = 'math';
          break;
        case 'science':
          subject = 'science';
          break;
        case 'english':
          subject = 'english';
          break;
        case 'history':
          subject = 'history';
          break;
        default:
          subject = 'other';
      }
      let condition: Condition = 'new';
      switch (book.condition) {
        case 'poor':
          condition = 'poor';
          break;
        case 'fair':
          condition = 'fair';
          break;
        case 'good':
          condition = 'good';
          break;
        case 'excellent':
          condition = 'excellent';
          break;
        default:
          condition = 'new';
      }
      console.log(`  Creating book: ${book.title} with owner: ${book.owner}`);
      // Create the book
      const createdBook = await prisma.book.upsert({
        where: {
          title_owner: {
            title: book.title,
            owner: book.owner,
          },
        },
        update: {
          title: book.title,
          isbn: book.isbn,
          subject,
          courseName: book.courseName,
          courseCrn: book.courseCrn,
          description: book.description,
          price: book.price,
          condition,
          imageURL: book.imageURL,
          owner: book.owner,
          approved: book.approved,
        },
        create: {
          title: book.title,
          isbn: book.isbn,
          subject,
          courseName: book.courseName,
          courseCrn: book.courseCrn,
          description: book.description,
          price: book.price,
          condition,
          imageURL: book.imageURL,
          owner: book.owner,
          approved: book.approved,
        },
      });

      // Associate saved books with users
      if (book.savedBy && book.savedBy.length > 0) {
        await Promise.all(
          book.savedBy.map(async (userId) => {
            await prisma.savedBook.upsert({
              where: {
                userId_bookId: {
                  userId,
                  bookId: createdBook.id,
                },
              },
              update: {}, // No need to update anything if it exists
              create: {
                userId,
                bookId: createdBook.id,
              },
            });
          }),
        );
      }
    }),
  );

  console.log('Seeding complete!');
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
