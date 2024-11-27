'use client';

import { Book } from '@prisma/client';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BookCard = ({ book }: { book: Book }) => (
  <Card className="book-card">
    <Card.Img
      variant="top"
      src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
      className="book-card-img"
    />
    <Card.Body className="book-card-body">
      <Card.Title className="book-card-title">{book.title}</Card.Title>
      <Card.Text className="book-card-text">{book.subject}</Card.Text>
      <Card.Text className="book-card-text">
        $
        {book.price.toFixed(2)}
      </Card.Text>
      <Card.Text className="book-card-text">{book.condition}</Card.Text>
      <div className="card-buttons">
        <Button variant="success">More Info</Button>
      </div>
    </Card.Body>
  </Card>
);

export default BookCard;
