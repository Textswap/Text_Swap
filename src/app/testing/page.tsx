import { getServerSession } from 'next-auth';
import { Container, Row, Col } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Book } from '@prisma/client';
import BookCard from '@/components/BookCard';
import { prisma } from '@/lib/prisma';

const TestingPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const owner = session?.user!.email ? session.user.email : '';
  const books: Book[] = await prisma.book.findMany({
    where: {
      owner,
    },
  });
  console.log(books);
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">Testing Books</h1>
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

export default TestingPage;
