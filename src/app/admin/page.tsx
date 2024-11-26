// src/app/admin/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
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
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

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

  const handleDelete = async () => {
    if (selectedBook) {
      try {
        const response = await fetch(
          `/api/adminapproval/delete/${selectedBook.id}`,
          {
            method: 'DELETE',
          },
        );
        if (!response.ok) {
          throw new Error('Failed to delete book');
        }
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== selectedBook.id));
        setShowModal(false); // Close the modal after successful deletion
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Error deleting book.');
      }
    }
  };

  const handleOpenModal = (book: Book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
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
                      onClick={() => handleOpenModal(book)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Delete Confirmation Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the textbook
            {' '}
            <strong>{selectedBook?.title}</strong>
            ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </main>
  );
};

export default AdminPage;
