'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import Link from 'next/link';
import defaultTextbooks from '@/components/defaultTextbooks';
import styles from './BuyPageClient.module.css';

const BuyPageClient: React.FC = () => {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filters, setFilters] = useState({
    subject: '',
    course: '',
    keywords: '',
    isbn: '',
    conditions: new Set<string>(),
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleConditionChange = (condition: string) => {
    const updatedConditions = new Set(filters.conditions);
    if (updatedConditions.has(condition)) {
      updatedConditions.delete(condition);
    } else {
      updatedConditions.add(condition);
    }
    setFilters({ ...filters, conditions: updatedConditions });
  };

  const filteredTextbooks = defaultTextbooks.filter((book) => {
    const matchesPrice = book.price <= maxPrice;
    const matchesSubject = !filters.subject || book.subject === filters.subject;
    const matchesCourse = !filters.course || book.course === filters.course;
    const matchesKeywords = !filters.keywords || book.title.toLowerCase().includes(filters.keywords.toLowerCase());
    const matchesISBN = !filters.isbn || book.isbn.includes(filters.isbn);
    const matchesCondition = filters.conditions.size === 0 || filters.conditions.has(book.condition);

    return (
      matchesPrice
      && matchesSubject
      && matchesCourse
      && matchesKeywords
      && matchesISBN
      && matchesCondition
    );
  });

  return (
    <Container fluid className="py-4">
      <Row>
        {/* Filters Section */}
        <Col
          xs={12}
          md={3}
          className="d-flex justify-content-center align-items-center"
          style={{ height: '80vh' }}
        >
          <div className={styles.filtersSection}>
            <h3 className={styles.filtersTitle}>Filters</h3>
            <Form>
              <Form.Group>
                <Form.Label>
                  Maximum Price: $
                  {maxPrice}
                </Form.Label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className={styles.rangeSlider}
                  style={{
                    background: `linear-gradient(to right, #1b4a3d ${
                      (maxPrice / 1000) * 100
                    }%, #ddd ${(maxPrice / 1000) * 100}%)`,
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Select
                  className={styles.selectField}
                  value={filters.subject}
                  onChange={(e) => handleFilterChange('subject', e.target.value)}
                >
                  <option value="">Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Arts">Arts</option>
                  <option value="Science">Science</option>
                  <option value="Computer Science">Computer Science</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Select
                  className={styles.selectField}
                  value={filters.course}
                  onChange={(e) => handleFilterChange('course', e.target.value)}
                >
                  <option value="">Course</option>
                  <option value="Algebra">Algebra</option>
                  <option value="History">History</option>
                  <option value="Physics">Physics</option>
                  <option value="Literature">Literature</option>
                  <option value="Algorithms">Algorithms</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="inputGroup mb-2">
                <Form.Control
                  className={styles.inputField}
                  type="text"
                  placeholder="Keywords"
                  value={filters.keywords}
                  onChange={(e) => handleFilterChange('keywords', e.target.value)}
                />
              </Form.Group>

              <Form.Group className="inputGroup">
                <Form.Control
                  className={styles.inputField}
                  type="text"
                  placeholder="ISBN"
                  value={filters.isbn}
                  onChange={(e) => handleFilterChange('isbn', e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Row} className="mt-4">
                {['Fair', 'Good', 'Excellent'].map((condition) => (
                  <Col key={condition} xs="auto" style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Check
                      type="checkbox"
                      label={condition}
                      onChange={() => handleConditionChange(condition)}
                      style={{
                        transform: 'scale(1.2)',
                        marginRight: '6px',
                        appearance: 'none',
                      }}
                    />
                  </Col>
                ))}
              </Form.Group>
            </Form>
          </div>
        </Col>

        {/* Textbook List Section */}
        <Col xs={12} md={9} className={styles.textbookList}>
          <h3 className="text-center text-success">Available Textbooks</h3>
          <div
            style={{
              maxHeight: '80vh', // Limit the height of the section
              overflowY: 'auto', // Enable vertical scrolling
              paddingRight: '15px', // Prevent content from being cut off due to scrollbar
            }}
          >
            {filteredTextbooks.length > 0 ? (
              <Row className="g-4">
                {filteredTextbooks.map((book) => (
                  <Col key={book.id} xs={12} sm={6} md={4}>
                    <Card className={styles.textbookCard}>
                      <Card.Img
                        variant="top"
                        src={book.picture}
                        style={{
                          height: '80%', // Takes up 80% of the card height
                          objectFit: 'cover', // Ensures the image scales properly
                        }}
                      />
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                          <strong>Price:</strong>
                          {' '}
                          $
                          {book.price}
                        </Card.Text>
                        <Card.Text>
                          <strong>Subject:</strong>
                          {' '}
                          {book.subject}
                        </Card.Text>
                        <Card.Text>
                          <strong>Condition:</strong>
                          {' '}
                          {book.condition}
                        </Card.Text>
                        <Card.Text>
                          <strong>ISBN:</strong>
                          {' '}
                          {book.isbn}
                        </Card.Text>
                        <Link
                          href={`/buy/${book.id}`}
                          style={{
                            textDecoration: 'none',
                            display: 'block',
                            backgroundColor: 'green',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            textAlign: 'center',
                          }}
                        >
                          View Details
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <p className="text-center">No textbooks match your filters.</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BuyPageClient;
