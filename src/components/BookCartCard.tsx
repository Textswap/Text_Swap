/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */

'use client';

import { useEffect, useState } from 'react';
import { Book } from '@prisma/client';
import { Image, Card, Button, Row, Col } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const getProfilePicture = (email: string | undefined) => {
  if (email === 'admin@foo.com') {
    return 'https://www.sogefiproperties.com/wp-content/uploads/2020/07/businessman-profile-icon-male-portrait-flat-design-vector-illustration-47075259.jpg';
  } if (email === 'john@foo.com') {
    return 'https://thumbs.dreamstime.com/b/businessman-profile-icon-male-portrait-flat-design-vector-illustration-47075253.jpg';
  } if (email === 'jane@foo.com') {
    return 'https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094837-stock-illustration-businesswoman-profile-icon.jpg';
  }
  return 'https://icons.veryicon.com/png/o/system/crm-android-app-icon/app-icon-person.png';
};

const BookCartCard = ({ book }: { book: Book }) => {
  const [imageSrc, setImageSrc] = useState<string>(book.imageURL || 'https://via.placeholder.com/150');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Only set the state after the component mounts on the client
  }, []);

  if (!isClient) return null; // Render nothing until mounted on the client

  const handleImageError = () => {
    console.log('Failed to load image');
    setImageSrc('https://via.placeholder.com/150');
  };

  const handleBuyNow = () => {
    router.push(`/payment?id=${book.id}`);
  };

  const handleRemoveBook = async () => {
    try {
      const response = await fetch('/api/book/remove-from-cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId: book.id }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data.message || 'An error occurred');
      } else {
        const data = await response.json();
        console.log('Book removed from cart:', data);
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to remove book from cart:', error);
    }
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
            <Card.Text style={{ fontSize: '1rem' }}>Condition: {book.condition}</Card.Text>
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
                src={getProfilePicture(book.owner)}
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
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
            <Button
              variant="link"
              className="cart-trash-can"
              // add functionality
              onClick={handleRemoveBook}
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
