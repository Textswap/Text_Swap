'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Book } from '@prisma/client';
import { Container, Row, Col, Spinner, Alert, Card, Button } from 'react-bootstrap';

interface BookDetails extends Book {
  images: { filePath: string }[];
}

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('Fetching book with ID:', id); // Debug log
        const response = await fetch(`/api/book/${id}`);

        console.log('Response status:', response.status); // Debug log

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText); // Log detailed error
          throw new Error(`Failed to fetch book details: ${errorText}`);
        }

        const data = await response.json();
        console.log('Fetched book data:', data); // Debug log

        setBook(data);
      } catch (err) {
        console.error('Detailed error:', err); // Log the full error
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Loading spinner
  if (loading) {
    return (
      <div className="text-center" style={{ marginTop: '20vh' }}>
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    );
  }

  // Error message
  if (error) {
    return (
      <div className="text-center">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  // Render book details
  if (book) {
    return (
      <Container fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <Card className="mb-4">
                <Row className="g-0">
                  {/* Book Image */}
                  <Col md={4} className="d-flex justify-content-center">
                    <Card.Img
                      src={book.images?.[0]?.filePath || 'https://via.placeholder.com/150'}
                      className="book-cart-img"
                      alt="Book Image"
                    />
                  </Col>

                  {/* Book Info */}
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <Card.Text>
                        <strong>Condition:</strong>
                        {book.condition}
                      </Card.Text>
                      <Card.Text>
                        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                        <strong>Price:</strong>${book.price.toFixed(2)}
                      </Card.Text>
                      <Card.Text>
                        <strong>Description:</strong>
                        {book.description}
                      </Card.Text>

                      {/* eslint-disable-next-line no-alert */}
                      <Button variant="primary" onClick={() => alert('Buying functionality here!')}>
                        Buy Now
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }

  return null;
};

export default BookPage;
