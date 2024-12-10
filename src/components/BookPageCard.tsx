/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Book } from '@prisma/client';
import { Image, Card, Button, Col, Row } from 'react-bootstrap';

const BookPageCard = ({ book }: { book: Book }) => {
  const [imageSrc, setImageSrc] = useState<string>(book.imageURL || 'https://via.placeholder.com/750');
  const [isLoadingAddToCart, setIsLoadingAddToCart] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleImageError = () => {
    setImageSrc('https://via.placeholder.com/750');
  };

  const handleAddToCart = async () => {
    setIsLoadingAddToCart(true);
    setError(null);

    try {
      const response = await fetch('/api/book/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId: book.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'An error occurred');
      } else {
        router.push('/cart');
      }
    } catch (err) {
      setError('Failed to add book to cart');
    } finally {
      setIsLoadingAddToCart(false);
    }
  };

  const handleGoBack = () => {
    router.push('/buy'); // Navigate back to the buy page
  };

  return (
    <div
      style={{
        position: 'relative',
        padding: '2.5rem',
      }}
    >
      {/* Go Back Button */}
      <Button
        onClick={handleGoBack}
        style={{
          position: 'absolute',
          top: '1px', // Place at the top
          right: '100px', // Place at the right
          zIndex: 10,
          borderRadius: '20px',
          border: 'none',
          backgroundColor: '#225f49', // Light green button
          color: 'white',
          padding: '10px 20px',
          fontWeight: 'bold',
          fontSize: '1rem',
        }}
      >
        Go Back
      </Button>

      <div className="book-card-wrapper">
        <Card className="book-card-page">
          <Row className="h-100">
            {/* Book Image */}
            <Col className="d-flex" style={{ margin: '1rem', width: '750px' }}>
              <Card.Img src={imageSrc} className="book-page-img" alt="Book Image" onError={handleImageError} />
            </Col>
            {/* Book Details */}
            <Col className="d-flex flex-column" style={{ margin: '1rem' }}>
              <Row style={{ marginBottom: '1.5rem' }}>
                <Card.Title style={{ fontSize: '3rem', marginBottom: '1rem' }}>{book.title}</Card.Title>
                <Card.Text style={{ fontSize: '1.5rem', marginBottom: '0rem' }}>
                  $
                  {book.price.toFixed(2)}
                </Card.Text>
                <Card.Text style={{ fontSize: '1.25rem' }}>
                  Condition:
                  {' '}
                  {book.condition.charAt(0).toUpperCase() + book.condition.slice(1)}
                </Card.Text>
              </Row>
              {/* Buttons */}
              <Row style={{ marginBottom: '1.5rem' }}>
                <Col>
                  <Button variant="primary" className="buy-now" onClick={() => console.log('Buy Now')}>
                    Buy Now
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="secondary"
                    className="add-to-cart"
                    onClick={handleAddToCart}
                    disabled={isLoadingAddToCart}
                  >
                    {isLoadingAddToCart ? 'Adding to Cart...' : 'Add to Cart'}
                  </Button>
                </Col>
              </Row>
              {/* More Info */}
              <Row style={{ marginTop: '0rem' }}>
                <Col>
                  <Card.Text>
                    <span className="book-info-label">ISBN: </span>
                    <span className="book-info-value">{book.isbn}</span>
                  </Card.Text>
                  <Card.Text>
                    <span className="book-info-label">Subject: </span>
                    <span className="book-info-value">{book.subject}</span>
                  </Card.Text>
                  <Card.Text>
                    <span className="book-info-label">Course Name: </span>
                    <span className="book-info-value">{book.courseName}</span>
                  </Card.Text>
                  <Card.Text>
                    <span className="book-info-label">Course CRN: </span>
                    <span className="book-info-value">{book.courseCrn}</span>
                  </Card.Text>
                </Col>
              </Row>
              {/* Description */}
              <Row>
                <Col
                  style={{
                    maxWidth: '600px',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    marginTop: '1rem',
                  }}
                >
                  Description:
                  <br />
                  <Card.Text
                    style={{
                      fontSize: '1rem',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 4,
                    }}
                    className="text-muted"
                  >
                    {book.description}
                  </Card.Text>
                </Col>
              </Row>
              {/* Seller Details */}
              <Row className="mt-auto">
                <Col xs={2} className="d-flex align-items-end">
                  <Image
                    src="https://via.placeholder.com/75"
                    className="seller-image rounded-circle"
                    style={{
                      objectFit: 'cover',
                    }}
                    alt="Seller"
                  />
                  <small className="ms-2 text-nowrap">
                    Sold by
                    {' '}
                    <span style={{ color: '#225f49' }}>
                      {book.owner}
                    </span>
                  </small>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default BookPageCard;
