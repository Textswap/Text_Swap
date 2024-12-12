'use client';

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Alert, Spinner, Image, Container } from 'react-bootstrap';
import styles from './AccountPageClient.module.css'; // Import the CSS module

type Book = {
  id: number;
  title: string;
  condition: string;
  price: number;
  imageURL?: string;
  description?: string;
};

type User = {
  username: string;
  email: string;
};

const getProfilePicture = (email: string | undefined) => {
  if (email === 'admin@foo.com') {
    return 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg';
  } if (email === 'john@foo.com') {
    return 'https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg';
  }
  return 'https://icons.veryicon.com/png/o/system/crm-android-app-icon/app-icon-person.png';
};

const SellerListings = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

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

    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/details');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser({
          username: data.email.split('@')[0], // Use part of the email as a username
          email: data.email, // Add the email property
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchSellerListings();
    fetchUserData();
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
    <Container fluid className={`${styles.sellerListingsContainer} mt-4`}>
      <Row className="justify-content-between">
        {/* Profile Section */}
        <Col
          md={4}
          className={styles.profileSection}
          style={{
            borderRight: '4px solid #4b8e72', // Vertical line
            paddingRight: '10px', // Add space between the line and content
          }}
        >
          <div className={`${styles.profileWrapper} d-flex flex-column align-items-center`}>
            {/* Profile Picture */}
            <Image
              src={getProfilePicture(user?.email)}
              alt="Profile Picture"
              className={styles.profileImage}
            />
            {/* Username and Bio */}
            <div className="text-center mt-3">
              <h3>{user?.username || 'Guest'}</h3>
            </div>
            {/* Buttons */}
            <div className={`${styles.profileButtons} d-flex mt-3`}>
              <Button
                variant="success"
                className="me-2"
                style={{
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#225f49', // Green button
                  color: 'white',
                  width: '100%',
                  maxWidth: '200px',
                  padding: '10px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  textAlign: 'center',
                }}
              >
                Follow
              </Button>
              <Button variant="secondary">
                Message
              </Button>
            </div>
            <p className="mt-3">
              <strong>Reviews:</strong>
              {' '}
              N/A
            </p>
          </div>
        </Col>

        {/* Listings Section */}
        <Col md={8} className={styles.listingsSection}>
          <h2 className="mb-4">Listings</h2>
          <div className={styles.scrollableSection}>
            {books.length === 0 ? (
              <p>You have no listings at the moment.</p>
            ) : (
              <Row>
                {books.map((book) => (
                  <Col key={book.id} sm={12} md={6} lg={6} className="mb-4">
                    <Card className={`h-100 ${styles.bookCard} shadow-sm`}>
                      <Card.Img
                        variant="top"
                        src={book.imageURL || 'https://via.placeholder.com/300x200'}
                        alt={`${book.title} Image`}
                        className={styles.fixedImage}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200';
                        }}
                      />
                      <Card.Body style={{ color: '#1a4a3a' }}>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                          <strong>Condition:</strong>
                          {' '}
                          {book.condition.charAt(0).toUpperCase() + book.condition.slice(1)}
                        </Card.Text>
                        <Card.Text>
                          <strong>Price:</strong>
                          {' '}
                          $
                          {book.price.toFixed(2)}
                        </Card.Text>
                        <Button
                          href={`/book/${book.id}?source=account`}
                          variant="primary"
                          style={{
                            borderRadius: '20px',
                            border: 'none',
                            backgroundColor: '#225f49', // Green button
                            color: 'white',
                            width: '100%',
                            maxWidth: '200px',
                            padding: '10px',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            textAlign: 'center',
                          }}
                        >
                          View Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SellerListings;
