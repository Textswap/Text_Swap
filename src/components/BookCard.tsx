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

  const handleImageError = () => {
    setImageSrc('https://via.placeholder.com/750');
  };

  return (
    <Card
      style={{
        backgroundColor: '#c8e6c9', // Soft green background
        borderRadius: '1rem',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
        border: 'none', // Remove default gray border
        overflow: 'hidden',
      }}
    >
      <Card.Img
        variant="top"
        src={imageSrc}
        alt="Book Image"
        onError={handleImageError}
        style={{
          height: '250px',
          objectFit: 'cover',
          borderRadius: '1rem 1rem 0 0', // Matches card corners
          border: '2px solid rgba(57, 175, 63, 0.5)',
        }}
      />
      <Card.Body>
        <Card.Title
          style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#225f49', // Dark green for text
            textAlign: 'center',
          }}
        >
          {book.title}
        </Card.Title>
        <Card.Text style={{ textAlign: 'center', marginTop: '10px' }}>
          <strong>Price:</strong> ${book.price}
        </Card.Text>
        <Card.Text style={{ textAlign: 'center' }}>
          <strong>Subject:</strong> {book.subject}
        </Card.Text>
        <Card.Text style={{ textAlign: 'center' }}>
          <strong>Condition:</strong> {book.condition}
        </Card.Text>
        <div
          className="details-wrapper"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Button
            onClick={handleViewDetails}
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
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
