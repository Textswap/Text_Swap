'use client';

import { Book } from '@prisma/client';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BookCard = ({ book }: { book: Book }) => (
  <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="holder.js/100px180" className="100px" />
    <Card.Body>
      <Card.Title>{book.title}</Card.Title>
      <Card.Text>{book.description}</Card.Text>
      <Button variant="primary">More Info</Button>
    </Card.Body>
  </Card>
);

export default BookCard;
