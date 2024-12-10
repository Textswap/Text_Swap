'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import BookPageCard from '@/components/BookPageCard'; // Import the Book card component

const AccountPage: React.FC = () => {
  const { data: session } = useSession();
  const [userBooks, setUserBooks] = useState<any[]>([]); // Store books listed by the user
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // We assert that session.user will definitely exist, since this page is only accessible when logged in
    const userEmail = session?.user?.email;
    if (userEmail) {
      const fetchUserBooks = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/books?owner=${userEmail}`);
          if (!response.ok) {
            throw new Error('Failed to fetch books');
          }
          const data = await response.json();
          setUserBooks(data); // Set the books fetched for the current user
        } catch (err) {
          setError('Error fetching books');
        } finally {
          setLoading(false);
        }
      };

      fetchUserBooks();
    }
  }, [session]);

  // Loading spinner
  if (loading) {
    return (
      <div className="text-center" style={{ marginTop: '20vh' }}>
        <Spinner animation="border" variant="primary" />
        <p>Loading your books...</p>
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

  return (
    <Container fluid className="py-3">
      <Row>
        {/* Left side content */}
        <Col xs={12} md={5}>
          <div className="profile-section">
            {/* Your profile info here */}
          </div>
        </Col>

        {/* Black vertical line */}
        <Col xs="auto">
          <div style={{ width: '1px', backgroundColor: 'black', height: '100%' }} />
        </Col>

        {/* Right side content - User's Listed Books */}
        <Col xs={12} md={7}>
          <h2>Your Listed Books</h2>
          <Row>
            {userBooks.length === 0 ? (
              <p>No books listed yet.</p>
            ) : (
              userBooks.map((book) => (
                <Col xs={12} sm={6} md={4} key={book.id} className="mb-4">
                  <BookPageCard book={book} />
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountPage;
