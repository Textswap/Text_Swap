import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { Book } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import BookCartCard from '@/components/BookCartCard';

const CartPage = async () => {
  const session = await getServerSession();
  const userEmail = session?.user?.email || '';
  const savedBooks = await prisma.savedBook.findMany({
    where: {
      user: {
        email: userEmail,
      },
    },
    include: {
      book: true,
    },
  });
  const books: Book[] = savedBooks.map((savedBook) => savedBook.book);
  return (
    <main>
      <Container id="book-cart-list">
        <Row className="mt-5 mb-2">
          <Col>
            <h1>
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              Your Cart: {books.length > 0 ? `${books.length} item${books.length > 1 ? 's' : ''}` : 'Empty'}
            </h1>
          </Col>
        </Row>
        {books.map((book) => (
          <Row key={book.id}>
            <Col>
              <BookCartCard book={book} />
            </Col>
          </Row>
        ))}
      </Container>
    </main>
  );
};

export default CartPage;
