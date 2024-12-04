import { useState } from 'react';
import { Book } from '@prisma/client';
import { Image, Card, Button, Col, Row } from 'react-bootstrap';

const BookPageCard = ({ book }: { book: Book }) => {
  const [imageSrc, setImageSrc] = useState<string>(book.imageURL || 'https://via.placeholder.com/750');

  console.log('Image URL:', book.imageURL);
  console.log('Image URL type:', typeof book.imageURL);
  console.log('Image URL exists:', book.imageURL !== undefined && book.imageURL !== null);

  const handleImageError = () => {
    console.log('Failed to load image');
    setImageSrc('https://via.placeholder.com/750');
  };
  return (
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
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              <Card.Text style={{ fontSize: '1.5rem', marginBottom: '0rem' }}>${book.price.toFixed(2)}</Card.Text>
              <Card.Text style={{ fontSize: '1.25rem' }}>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                Condition: {book.condition.charAt(0).toUpperCase() + book.condition.slice(1)}
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
                <Button variant="secondary" className="add-to-cart" onClick={() => console.log('Add to Cart')}>
                  Add to Cart
                </Button>
              </Col>
            </Row>
            {/* Description */}
            <Row>
              <Col style={{ maxWidth: '600px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                <Card.Text style={{ fontSize: '1rem' }} className="text-muted">
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
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                <small className="ms-2 text-nowrap">Sold by {book.owner}</small>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default BookPageCard;
