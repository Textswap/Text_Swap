'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import defaultTextbooks from '@/components/defaultTextbooks';

const BuyPageClient: React.FC = () => {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filters, setFilters] = useState({
    department: '',
    course: '',
    format: '',
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
    const matchesDepartment = !filters.department || book.department === filters.department;
    const matchesCourse = !filters.course || book.course === filters.course;
    const matchesFormat = !filters.format || book.format === filters.format;
    const matchesKeywords =
      !filters.keywords || book.title.toLowerCase().includes(filters.keywords.toLowerCase());
    const matchesISBN = !filters.isbn || book.isbn.includes(filters.isbn);
    const matchesCondition =
      filters.conditions.size === 0 || filters.conditions.has(book.condition);

    return (
      matchesPrice &&
      matchesDepartment &&
      matchesCourse &&
      matchesFormat &&
      matchesKeywords &&
      matchesISBN &&
      matchesCondition
    );
  });

  return (
    <Container fluid className="py-4">
      <Row>
        {/* Filters Section */}
        <Col xs={12} md={3}>
          <h3 className="text-center text-success">Filters</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Maximum Price: ${maxPrice}</Form.Label>
              <Form.Range
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
              >
                <option value="">Select Department</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Arts">Arts</option>
                <option value="Science">Science</option>
                <option value="Computer Science">Computer Science</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select
                value={filters.course}
                onChange={(e) => handleFilterChange('course', e.target.value)}
              >
                <option value="">Select Course</option>
                <option value="Algebra">Algebra</option>
                <option value="History">History</option>
                <option value="Physics">Physics</option>
                <option value="Literature">Literature</option>
                <option value="Algorithms">Algorithms</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select
                value={filters.format}
                onChange={(e) => handleFilterChange('format', e.target.value)}
              >
                <option value="">Select Format</option>
                <option value="Hardcover">Hardcover</option>
                <option value="Paperback">Paperback</option>
                <option value="eBook">eBook</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search by Keywords"
                value={filters.keywords}
                onChange={(e) => handleFilterChange('keywords', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search by ISBN"
                value={filters.isbn}
                onChange={(e) => handleFilterChange('isbn', e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              {['Fair', 'Good', 'Excellent'].map((condition) => (
                <Form.Check
                  key={condition}
                  type="checkbox"
                  label={condition}
                  checked={filters.conditions.has(condition)}
                  onChange={() => handleConditionChange(condition)}
                />
              ))}
            </Form.Group>
          </Form>
        </Col>

        {/* Textbook List Section */}
        <Col xs={12} md={9}>
          <h3 className="text-center text-success">Available Textbooks</h3>
          {filteredTextbooks.length > 0 ? (
            <Row className="g-4">
              {filteredTextbooks.map((book) => (
                <Col key={book.id} xs={12} sm={6} md={4}>
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <Card.Text>
                        <strong>Price:</strong> ${book.price}
                      </Card.Text>
                      <Card.Text>
                        <strong>Department:</strong> {book.department}
                      </Card.Text>
                      <Card.Text>
                        <strong>Condition:</strong> {book.condition}
                      </Card.Text>
                      <Card.Text>
                        <strong>Format:</strong> {book.format}
                      </Card.Text>
                      <Card.Text>
                        <strong>ISBN:</strong> {book.isbn}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center">No textbooks match your filters.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BuyPageClient;
