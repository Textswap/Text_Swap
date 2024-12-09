/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */

'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Book } from '@prisma/client';
import BookBuyCard from '@/components/BookCard';
import styles from './BuyPageClient.module.css';

const BuyPageClient: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filters, setFilters] = useState({
    subject: '',
    courseName: '',
    keywords: '',
    isbn: '',
    conditions: new Set<string>(),
  });

  // Fetch books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/book/buy-page');
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

  const filteredBooks = books.filter((book) => {
    const matchesPrice = book.price <= maxPrice;
    const matchesSubject = !filters.subject || book.subject.toLowerCase() === filters.subject.toLowerCase();
    const matchesCourse =
      !filters.courseName || book.courseName?.toLowerCase().includes(filters.courseName.toLowerCase());
    const matchesKeywords = !filters.keywords || book.title.toLowerCase().includes(filters.keywords.toLowerCase());
    const matchesISBN = !filters.isbn || book.isbn?.includes(filters.isbn);
    const matchesCondition = filters.conditions.size === 0 || filters.conditions.has(book.condition);

    return matchesPrice && matchesSubject && matchesCourse && matchesKeywords && matchesISBN && matchesCondition;
  });

  return (
    <Container fluid className="py-4">
      <Row>
        {/* Filters Section */}
        <Col xs={12} md={3} className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <div className={styles.filtersSection}>
            <h3 className={styles.filtersTitle}>Filters</h3>
            <Form>
              <Form.Group>
                <Form.Label>Maximum Price: ${maxPrice}</Form.Label>
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

              <Form.Group className="mb-4">
                <Form.Select
                  className={styles.selectField}
                  value={filters.subject}
                  onChange={(e) => handleFilterChange('subject', e.target.value)}
                >
                  <option value="">Subject</option>
                  <option value="math">Math</option>
                  <option value="english">English</option>
                  <option value="science">Science</option>
                  <option value="history">History</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Control
                  className={styles.inputField}
                  type="text"
                  placeholder="Course Name"
                  value={filters.courseName}
                  onChange={(e) => handleFilterChange('courseName', e.target.value)}
                />
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

              <Form.Group className="inputGroup mb-4">
                <Form.Control
                  className={styles.inputField}
                  type="text"
                  placeholder="ISBN"
                  value={filters.isbn}
                  onChange={(e) => handleFilterChange('isbn', e.target.value)}
                />
              </Form.Group>
              
                  
              <div style={{ textAlign: 'center', padding: '0', backgroundColor: '#c8e6c9', borderRadius: '0.5rem' }}>
                <h5 style={{ color: '#225f49' }}>Select Condition</h5>
                  <Form.Group as={Row}>
                    {['new', 'excellent', 'good', 'fair', 'poor'].map((condition) => (
                      <Col 
                        key={condition} 
                        xs="auto" 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0.5rem',
                          }}
                          >
                        <Form.Check
                          type="checkbox"
                          label={condition.charAt(0).toUpperCase() + condition.slice(1)}
                          onChange={() => handleConditionChange(condition)}
                          style={{
                            transform: 'scale(1.2)',
                            appearance: 'none',
                            margin: '0',
                          }}
                        />
                      </Col>
                    ))}
                  </Form.Group>
              </div>
            </Form>
          </div>
        </Col>

        {/* Textbook List Section */}
        <Col xs={12} md={9} className={styles.textbookList}>
          <h3 className="text-center text-success">Available Textbooks</h3>
          <div
            style={{
              maxHeight: '80vh',
              overflowY: 'auto',
              paddingRight: '15px',
            }}
          >
            {filteredBooks.length > 0 ? (
              <Row className="g-4">
                {filteredBooks.map((book) => (
                  <Col key={book.id} xs={12} sm={6} md={4}>
                    <div className="textbookCard">
                      <BookBuyCard book={book} />
                    </div>
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
