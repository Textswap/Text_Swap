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
          email: account.email,
          password,
          role,
        },
      });
    }),
  );
  // Create books using forEach
  await Promise.all(
    config.defaultBooks.map(async (book, index) => {
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
      // Create the book
      const createdBook = await prisma.book.upsert({
        where: { id: index + 1 }, // Use 0 or another fallback logic if there's no id
        update: {},
        create: {
          title: book.title,
          subject,
          description: book.description,
          price: book.price,
          condition,
          imageURL: book.imageUrl,
          owner: book.owner,
          approved: book.approved,
        },
      });

      // Associate saved books with users
      if (book.savedBy && book.savedBy.length > 0) {
        await Promise.all(
          book.savedBy.map(async (userId) => {
            // Check if the saved book association already exists
            const existingSavedBook = await prisma.savedBook.findUnique({
              where: {
                userId_bookId: {
                  userId,
                  bookId: createdBook.id,
                },
              },
            });

            // If it doesn't exist, create the saved book association
            if (!existingSavedBook) {
              await prisma.savedBook.create({
                data: {
                  userId,
                  bookId: createdBook.id,
                },
              });
            }
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
