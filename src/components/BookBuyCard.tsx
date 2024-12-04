/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from 'react';
import { Book } from '@prisma/client';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const BookCard = ({ book }: { book: Book }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/book/${book.id}`);
  };

  const [imageSrc, setImageSrc] = useState<string>(book.imageURL || 'https://via.placeholder.com/750');

  console.log('Image URL:', book.imageURL);
  console.log('Image URL type:', typeof book.imageURL);
  console.log('Image URL exists:', book.imageURL !== undefined && book.imageURL !== null);

  const handleImageError = () => {
    console.log('Failed to load image');
    setImageSrc('https://via.placeholder.com/750');
  };
  return (
    <Card className="book-buy-card">
      <Card.Img variant="top" src={imageSrc} className="book-buy-img" alt="Book Image" onError={handleImageError} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
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
        <div className="details-wrapper">
          <Button
            className="view-details"
            onClick={handleViewDetails}
            style={{
              borderRadius: '50px',
              border: '0',
              backgroundColor: 'var(--main-color)',
              color: 'white',
              textAlign: 'center',
              width: '100%',
              maxWidth: '250px',
              height: 'auto',
              padding: '10px',
            }}
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
