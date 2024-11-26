// src/app/admin/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from '@/styles/AdminPage.module.css';

interface Book {
  id: string;
  title: string;
  condition: string;
  price: string;
  imageUrl: string;
}

const AdminPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/adminapproval');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/adminapproval/approve/${id}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to approve book');
      }

      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error approving book:', error);
      alert('Error approving book.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/adminapproval/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <main>
      <Container className={styles.container} fluid>
        <h1 className={styles.title}>Admin Page</h1>
        <Row>
          {books.map((book) => (
            <Col key={book.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className={styles.card}>
                <Card.Img
                  variant="top"
                  src={
                    book.imageUrl
                      ? book.imageUrl
                      : 'https://via.placeholder.com/150'
                  }
                  alt="Book image"
                  className={styles.cardImage}
                />

                <Card.Body className={styles.cardBody}>
                  <Card.Title className={styles.cardTitle}>
                    {book.title}
                  </Card.Title>
                  <Card.Text className={styles.cardText}>
                    Condition:
                    {book.condition}
                  </Card.Text>
                  <Card.Text className={styles.cardText}>
                    Price:
                    {book.price}
                  </Card.Text>
                  <div className={styles.cardButtons}>
                    <Button
                      variant="success"
                      className={styles.button}
                      onClick={() => handleApprove(book.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      className={styles.button}
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
