// src/app/admin/page.tsx

'use client';

import React, { useState } from 'react';
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
    refreshInterval: 10000, // Poll every 10 seconds
  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/adminapproval/approve/${id}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to approve book');
      mutate();
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
          { method: 'DELETE' },
        );
        if (!response.ok) throw new Error('Failed to delete book');
        mutate(); // Trigger revalidation to update data
        setShowDeleteModal(false);
        setSelectedBook(null);
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Error deleting book.');
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
                  src={
                    book.imageUrl
                      ? book.imageUrl
                      : 'https://via.placeholder.com/150'
                  }
                  alt="Book image"
                  className={styles.cardImage}
                />
                <Card.Body className={styles.cardBody}>
                  <Card.Title
                    style={{ color: 'var(--main-color)' }}
                    className={styles.cardTitle}
                  >
                    {book.title}
                  </Card.Title>
                  <Card.Text className={styles.cardText}>
                    Subject:
                    {book.category}
                  </Card.Text>
                  <Card.Text className={styles.cardText}>
                    Price:
                    $
                    {book.price}
                  </Card.Text>
                  <Card.Text className={styles.cardText}>
                    Condition:
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
        <Modal
          show={showDetailsModal}
          onHide={handleCloseDetailsModal}
          size="lg"
          centered
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: 'var(--main-color)', color: 'white' }}
          >
            <Modal.Title>Textbook Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedBook && (
              <>
                <div className="text-center mb-4">
                  <img
                    src={
                      selectedBook.imageUrl
                        ? selectedBook.imageUrl
                        : 'https://via.placeholder.com/150'
                    }
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
                      <td>
                        {new Date(selectedBook.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </Modal.Body>
          <Modal.Footer
            style={{ backgroundColor: 'var(--main-color)', color: 'white' }}
          >
            <Button variant="secondary" onClick={handleCloseDetailsModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
          <Modal.Header
            closeButton
            style={{ backgroundColor: 'var(--main-color)', color: 'white' }}
          >
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the textbook
            {' '}
            <strong style={{ color: 'var(--main-color)', fontWeight: '800' }}>
              {selectedBook?.title}
            </strong>
            ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
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
