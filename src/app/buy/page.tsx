import { Container, Row, Col } from 'react-bootstrap';
import BookCard from '@/components/BookCard';
import { Book } from '@prisma/client';
import { prisma } from '@/lib/prisma';

const BuyPage = async () => {
  const books: Book[] = await prisma.book.findMany({});
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">Buy Page</h1>
            </Col>
          </Row>
          <Row xs={1} md={2} lg={3} className="g-4">
            {books.map((book) => (
              <Col key={book.id}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default BuyPage;
