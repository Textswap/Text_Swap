import { getServerSession } from 'next-auth';
import { Container, Row, Col } from 'react-bootstrap';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Book } from '@prisma/client';
import BookCardAdmin from '@/components/BookCardAdmin';
import { prisma } from '@/lib/prisma';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const books: Book[] = await prisma.book.findMany({
    where: {
      approved: false,
    },
  });
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">Admin Page</h1>
            </Col>
          </Row>
          {/* Check if there are books to display */}
          {books.length === 0 ? (
            <Row>
              <Col className="text-center">
                <p>No unapproved books available.</p>
              </Col>
            </Row>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {books.map((book) => (
                <Col key={book.id}>
                  <BookCardAdmin book={book} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </Container>
    </main>
  );
};

export default AdminPage;
