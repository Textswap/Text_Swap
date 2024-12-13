/* eslint-disable react/jsx-one-expression-per-line */

'use client';

import { useState } from 'react';
import { Book } from '@prisma/client';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';

const BookCardAdmin = ({ book }: { book: Book }) => {
  const [imageSrc, setImageSrc] = useState<string>(book.imageURL || 'https://via.placeholder.com/750');
  const [isLoadingApprove, setIsLoadingApprove] = useState<boolean>(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);

  /* prints for debugging images
  console.log('Image URL:', book.imageURL);
  console.log('Image URL type:', typeof book.imageURL);
  console.log('Image URL exists:', book.imageURL !== undefined && book.imageURL !== null);
  */

  const handleImageError = () => {
    console.log('Failed to load image');
    setImageSrc('https://via.placeholder.com/750');
  };
  const handleApprove = async () => {
    setIsLoadingApprove(true);
    try {
      const response = await axios.put('/api/book/approve-book', {
        bookId: book.id,
      });
      if (response.status === 200) {
        console.log('Book approved successfully!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error approving book:', error);
    } finally {
      setIsLoadingApprove(false);
    }
  };

  const handleRemove = async () => {
    setIsLoadingRemove(true);
    try {
      const response = await axios.delete('/api/book/remove-book', {
        data: { bookId: book.id },
      });
      if (response.status === 200) {
        console.log('Book removed successfully!');
        window.location.reload();
      } else {
        console.log('Failed to remove book:', response);
      }
    } catch (error) {
      console.error('Error removing book:', error);
      setIsLoadingRemove(false);
    } finally {
      setIsLoadingRemove(false);
    }
  };
  return (
    <Card className="book-card">
      <Card.Img variant="top" src={imageSrc} className="book-img" alt="Book Image" onError={handleImageError} />
      <Card.Body>
        <Link className="book-link" href={`/book/${book.id}`}>
          <Card.Title>{book.title}</Card.Title>
        </Link>
        <Card.Text>
          <strong>Price:</strong> ${book.price.toFixed(2)}
        </Card.Text>
        <Card.Text>
          <strong>Subject:</strong> {book.subject.charAt(0).toUpperCase() + book.subject.slice(1)}
        </Card.Text>
        <Card.Text>
          <strong>Condition:</strong> {book.condition.charAt(0).toUpperCase() + book.condition.slice(1)}
        </Card.Text>
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
            onClick={handleApprove}
            disabled={isLoadingApprove}
          >
            {isLoadingApprove ? 'Approving...' : 'Approve'}
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
            onClick={handleRemove}
            disabled={isLoadingRemove}
          >
            {isLoadingRemove ? 'Removing...' : 'Remove'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCardAdmin;
