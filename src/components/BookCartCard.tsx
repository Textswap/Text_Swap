'use client';

import { useState } from 'react';
import { Book } from '@prisma/client';
import { Image, Card, Button, Row, Col } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import Link from 'next/link';

const BookCartCard = ({ book }: { book: Book }) => {
  const [imageSrc, setImageSrc] = useState<string>(book.imageURL || 'https://via.placeholder.com/150');

  console.log('Image URL:', book.imageURL);
  console.log('Image URL type:', typeof book.imageURL);
  console.log('Image URL exists:', book.imageURL !== undefined && book.imageURL !== null);

  const handleImageError = () => {
    console.log('Failed to load image');
    setImageSrc('https://via.placeholder.com/150');
  };
  return (
    // wrapper
    <div className="book-cart-wrapper mb-5">
      <Card className="book-card-cart">
        <Row className="h-100" style={{ marginTop: '1rem' }}>
          {/* Book Image */}
          <Col className="d-flex" style={{ marginLeft: '1rem' }}>
            <Card.Img src={imageSrc} className="book-cart-img" alt="Book Image" onError={handleImageError} />
          </Col>
          {/* Book Details */}
          <Col xs={8} className="d-flex flex-column justify-content-between h-100">
            <Link className="book-link" href={`/book/${book.id}`}>
              <Card.Title style={{ fontSize: '2rem' }}>{book.title}</Card.Title>
            </Link>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <Card.Text style={{ fontSize: '1rem' }}>Condition: {book.condition}</Card.Text>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <Card.Text style={{ fontSize: '1.25rem' }}>${book.price.toFixed(2)}</Card.Text>
            <div className="cart-description-box">
              <Card.Text style={{ fontSize: '0.75rem' }} className="text-truncate text-muted">
                {book.description}
              </Card.Text>
            </div>
          </Col>
          {/* Seller Details */}
          <Col xs={2} className="d-flex flex-column align-items-end" style={{ marginRight: '1rem' }}>
            <div
              style={{
                width: '75px',
                height: '75px',
              }}
            >
              <Image
                src="https://via.placeholder.com/75"
                className="seller-image rounded-circle w-100 h-100"
                style={{
                  objectFit: 'cover',
                }}
                alt="Seller"
              />
            </div>
            <small
              className="text-muted text-truncate"
              style={{
                maxWidth: '100%',
                overflow: 'hidden',
              }}
            >
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              Sold by {book.owner}
            </small>
          </Col>
        </Row>
        {/* Buy Now Button */}
        <Row className="d-flex justify-content-center align-items-center">
          <div className="cart-buy-now-wrapper">
            <Button
              variant="primary"
              className="cart-buy-now"
              // add functionality
              onClick={() => console.log('Buy Now')}
            >
              Buy Now
            </Button>
            <Button
              variant="link"
              className="cart-trash-can"
              // add functionality
              onClick={() => console.log('Delete book from cart')}
            >
              <Trash />
            </Button>
          </div>
        </Row>
      </Card>
    </div>
  );
};

export default BookCartCard;
