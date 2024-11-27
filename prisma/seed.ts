import { PrismaClient, Role, Condition, Subject } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
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
    // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  });
  config.defaultData.forEach(async (data, index) => {
    let condition: Condition = 'good';
    if (data.condition === 'poor') {
      condition = 'poor';
    } else if (data.condition === 'excellent') {
      condition = 'excellent';
    } else {
      condition = 'fair';
    }
    console.log(`  Adding stuff: ${data.name} (${data.owner})`);
    await prisma.stuff.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  });
  config.defaultBooks.forEach(async (book, index) => {
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
    const createdBook = await prisma.book.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
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
    if (book.images && Array.isArray(book.images)) {
      for (const imagePath of book.images) {
        await prisma.bookImage.create({
          data: {
            bookId: createdBook.id,
            filePath: imagePath,
          },
        });
      }
    }
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
