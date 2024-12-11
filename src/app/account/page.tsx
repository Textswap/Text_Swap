'use client';

import { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Alert, Spinner, Image, Container } from 'react-bootstrap';

type Book = {
  id: number;
  title: string;
  condition: string;
  price: number;
  imageURL?: string;
  description?: string;
};

const SellerListings = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSellerListings = async () => {
      try {
        const response = await fetch('/api/book/seller-listings');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch seller listings');
        }

        const data: Book[] = await response.json();
        setBooks(data);
      } catch (err) {
        console.error('Error fetching seller listings:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSellerListings();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading your listings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </div>
    );
  }

  return (
    <Container className="seller-listings-container mt-4">
      <Row>
        {/* Profile Section */}
        <Col md={4} className="profile-section text-center">
          <Image
            src="https://via.placeholder.com/150"
            alt="Profile Picture"
            roundedCircle
            className="mb-3 profile-image"
          />
          <h3>Username</h3>
          <p className="text-muted">Bio</p>
          <Button variant="success" className="me-2">
            Follow
          </Button>
          <Button variant="secondary">Message</Button>
          <p className="mt-4">
            <strong>Reviews:</strong>
            {' '}
            10
          </p>
        </Col>

        {/* Listings Section */}
        <Col md={8} className="listings-section">
          <h2>Listings</h2>
          {books.length === 0 ? (
            <p>You have no listings at the moment.</p>
          ) : (
            <Row>
              {books.map((book) => (
                <Col key={book.id} sm={12} md={6} lg={6} className="mb-4">
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={book.imageURL || 'https://via.placeholder.com/300x200'}
                      alt={`${book.title} Image`}
                      className="fixed-image"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200';
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <Card.Text>
                        <strong>Condition:</strong>
                        {' '}
                        {book.condition}
                      </Card.Text>
                      <Card.Text>
                        <strong>Price:</strong>
                        {' '}
                        $
                        {book.price.toFixed(2)}
                      </Card.Text>
                      <Button href={`/book/${book.id}`} variant="primary">
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SellerListings;
