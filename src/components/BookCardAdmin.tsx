/* eslint-disable react/jsx-one-expression-per-line */

'use client';

import { useState } from 'react';
import { Book } from '@prisma/client';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

const BookCardAdmin = ({ book }: { book: Book }) => {
  const [imageSrc, setImageSrc] = useState<string>(book.imageURL || 'https://via.placeholder.com/750');

  console.log('Image URL:', book.imageURL);
  console.log('Image URL type:', typeof book.imageURL);
  console.log('Image URL exists:', book.imageURL !== undefined && book.imageURL !== null);

  const handleImageError = () => {
    console.log('Failed to load image');
    setImageSrc('https://via.placeholder.com/750');
  };
  return (
    <Card className="book-card">
      <Card.Img variant="top" src={imageSrc} className="book-img" alt="Book Image" onError={handleImageError} />
      <Card.Body>
        <Link className="book-link" href={`/book/${book.id}`}>
          <Card.Title>{book.title}</Card.Title>
        </Link>
        <Card.Text>
          <strong>Price:</strong> ${book.price}
        </Card.Text>
        <Card.Text>
          <strong>Subject:</strong> {book.subject}
        </Card.Text>
        <Card.Text>
          <strong>Condition:</strong> {book.condition}
        </Card.Text>
        {book.isbn && (
          <Card.Text>
            <strong>ISBN:</strong> {book.isbn}
          </Card.Text>
        )}
        <div className="admin-buttons">
          <Button
            className="approve-button"
            variant="success"
            style={{
              borderRadius: '50px',
              border: '0',
              color: 'white',
              textAlign: 'center',
              width: '100%',
              maxWidth: '150px',
              height: 'auto',
              padding: '10px',
              marginRight: '1rem',
            }}
          >
            Approve
          </Button>
          <Button
            className="remove-button"
            variant="danger"
            style={{
              borderRadius: '50px',
              border: '0',
              color: 'white',
              textAlign: 'center',
              width: '100%',
              maxWidth: '150px',
              height: 'auto',
              padding: '10px',
              marginLeft: '1rem',
            }}
          >
            Remove
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCardAdmin;
