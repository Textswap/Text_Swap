// src/app/admin/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Table,
} from 'react-bootstrap';
import useSWR from 'swr';
import styles from '@/styles/AdminPage.module.css';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  courseName?: string;
  courseCrn?: string;
  price: string;
  condition: string;
  imageUrl: string;
  createdAt: string;
}

const fetcher = (url: string) => fetch(url, { cache: 'no-store' }).then((res) => res.json());

const AdminPage: React.FC = () => {
  const { data: books = [], mutate } = useSWR<Book[]>('/api/adminapproval', fetcher, {
    refreshInterval: 10000, // Polling fallback
  });

  useEffect(() => {
    const eventSource = new EventSource('/api/adminapproval/stream'); // Connect to your SSE stream

    eventSource.onmessage = (event) => {
      const { action } = JSON.parse(event.data); // Only destructure 'action' since 'id' is not used

      if (action === 'approve' || action === 'delete') {
        mutate(); // Trigger the SWR re-fetch to get the latest books
      }
    };

    eventSource.onerror = (error) => {
      console.error('Error with SSE connection:', error);
    };

    return () => {
      eventSource.close(); // Clean up the SSE connection on component unmount
    };
  }, [mutate]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/adminapproval/approve/${id}`, { method: 'POST' });
      if (!response.ok) throw new Error('Failed to approve book');
      mutate();
    } catch (error) {
      setErrorMessage('Error approving book.');
    }
  };

  const handleDelete = async () => {
    if (selectedBook) {
      try {
        const response = await fetch(`/api/adminapproval/delete/${selectedBook.id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete book');
        mutate((prevBooks: Book[] = []) => prevBooks.filter((book) => book.id !== selectedBook.id), false);
        setShowDeleteModal(false);
        setSelectedBook(null);
      } catch (error) {
        setErrorMessage('Error deleting book.');
      }
    }
  };

  const handleShowDetailsModal = (book: Book) => {
    setSelectedBook(book);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedBook(null);
  };

  const handleShowDeleteModal = (book: Book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedBook(null);
  };

  return (
    <main>
      <Container className={styles.container} fluid>
        <h1 className={styles.title}>Admin Page</h1>

        {/* Display error message if there is one */}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <Row>
          {books.map((book) => (
            <Col key={book.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card
                className={styles.card}
                onClick={() => handleShowDetailsModal(book)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Img
                  variant="top"
                  src={book.imageUrl || 'https://via.placeholder.com/150'}
                  alt="Book image"
                  className={styles.cardImage}
                />
                <Card.Body className={styles.cardBody}>
                  <Card.Title style={{ color: 'var(--main-color)' }} className={styles.cardTitle}>
                    {book.title}
                  </Card.Title>
                  <Card.Text className={styles.cardText}>
                    Subject:
                    <br />
                    {book.category}
                  </Card.Text>
                  <Card.Text className={styles.cardText}>
                    Price:
                    <br />
                    $
                    {book.price}
                  </Card.Text>
                  <Card.Text className={styles.cardText}>
                    Condition:
                    <br />
                    {book.condition}
                  </Card.Text>
                  <div className={styles.cardButtons}>
                    <Button
                      variant="success"
                      className={styles.button}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApprove(book.id);
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      className={styles.button}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowDeleteModal(book);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Details Modal */}
        <Modal show={showDetailsModal} onHide={handleCloseDetailsModal} size="lg" centered>
          <Modal.Header closeButton style={{ backgroundColor: 'var(--main-color)', color: 'white' }}>
            <Modal.Title>Textbook Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedBook && (
              <>
                <div className="text-center mb-4">
                  <img
                    src={selectedBook.imageUrl || 'https://via.placeholder.com/150'}
                    alt="Book"
                    className="img-fluid"
                    style={{ maxHeight: '300px', borderRadius: '10px' }}
                  />
                </div>
                <Table bordered>
                  <tbody>
                    <tr>
                      <th>Title</th>
                      <td>{selectedBook.title}</td>
                    </tr>
                    <tr>
                      <th>Author</th>
                      <td>{selectedBook.author}</td>
                    </tr>
                    <tr>
                      <th>ISBN</th>
                      <td>{selectedBook.isbn}</td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td>{selectedBook.category}</td>
                    </tr>
                    <tr>
                      <th>Course Name</th>
                      <td>{selectedBook.courseName || 'N/A'}</td>
                    </tr>
                    <tr>
                      <th>Course CRN</th>
                      <td>{selectedBook.courseCrn || 'N/A'}</td>
                    </tr>
                    <tr>
                      <th>Price</th>
                      <td>
                        $
                        {selectedBook.price}
                      </td>
                    </tr>
                    <tr>
                      <th>Condition</th>
                      <td>{selectedBook.condition}</td>
                    </tr>
                    <tr>
                      <th>Created At</th>
                      <td>{new Date(selectedBook.createdAt).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetailsModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Modal */}
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
          <Modal.Header closeButton style={{ backgroundColor: 'var(--main-color)', color: 'white' }}>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this book?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </main>
  );
};

export default AdminPage;
