'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, LockFill } from 'react-bootstrap-icons';

export const dynamic = 'force-dynamic';

const PaymentPage: React.FC = () => {
  const searchParams = useSearchParams(); // Use searchParams to get query parameters
  const id = searchParams.get('id');
  const [book, setBook] = useState<any>(null);
  const [formData, setFormData] = useState({
    cardType: 'credit',
    cardNetwork: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingEmail: '',
    billingPhone: '',
    saveCard: false,
  });

  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/book/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch book details');
          return res.json();
        })
        .then((data) => setBook(data))
        .catch((err) => {
          console.error(err);
          setBook(null); // Gracefully handle errors
        });
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment submitted:', formData);
    setShowTips(true);
  };

  const cardNetworks = [
    { value: 'visa', label: 'Visa' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'amex', label: 'American Expressa' },
    { value: 'discover', label: 'Discover' },
  ];

  if (!book) {
    return <div>Loading...</div>;
  }

  if (!id) {
    return (
      <div>
        <h2>Error: Missing required `id` parameter.</h2>
      </div>
    );
  }

  return (
    <Container
      fluid
      className="d-flex flex-wrap justify-content-center align-items-center"
      style={{
        backgroundColor: 'var(--secondary-color)',
        overflowY: 'auto',
        maxHeight: '100vh',
        padding: 'calc(4rem + 56px) 2rem 2rem',
        gap: '2rem',
      }}
    >
      <div
        className="text-center mb-3 p-4"
        style={{
          maxWidth: '500px',
          backgroundColor: '#2E8B57',
          color: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        <h3 className="display-5 mb-3">Complete Your Payment</h3>
        <p className="lead">
          You&apos;re just one step away from finalizing your transaction. Please
          complete your payment to confirm your order.
        </p>
        <div
          className="mt-3 p-3 rounded"
          style={{
            background: '#2F855A',
            border: '2px solid rgba(255,255,255,0.3)',
            color: 'white',
          }}
        >
          <strong>Need Assistance?</strong>
          <p className="mb-0 mt-1">
            For payment-related concerns or inquiries, you can email us directly at
            <strong> textswap@foo.com</strong>
            . Our team is here to help!
          </p>
        </div>
      </div>

      <Card
        className="w-100 shadow-lg"
        style={{
          maxWidth: '600px',
          borderWidth: '2px',
          borderRadius: '12px',
        }}
      >
        <Card.Header
          className="text-center py-4"
          style={{
            backgroundColor: '#2E8B57',
            color: 'white',
          }}
        >
          <h2 className="mb-0">Secure Payment</h2>
          <small className="text-light">
            <ShieldCheck />
            {' '}
            Complete your transaction safely
          </small>
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#2E8B57' }}>Card Type</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Credit"
                      name="cardType"
                      value="credit"
                      checked={formData.cardType === 'credit'}
                      onChange={handleInputChange}
                      style={{ color: 'var(--main-color-darker)' }}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Debit"
                      name="cardType"
                      value="debit"
                      checked={formData.cardType === 'debit'}
                      onChange={handleInputChange}
                      style={{ color: 'var(--main-color-darker)' }}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#2E8B57' }}>Card Network</Form.Label>
                  <Form.Select
                    name="cardNetwork"
                    value={formData.cardNetwork}
                    onChange={handleInputChange}
                    style={{
                      borderColor: '#2E8B57',
                      backgroundColor: 'white',
                    }}
                  >
                    <option value="">Select Network</option>
                    {cardNetworks.map((network) => (
                      <option key={network.value} value={network.value}>
                        {network.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2E8B57' }}>
                Cardholder Name
              </Form.Label>
              <Form.Control
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                placeholder="Full Name as on Card"
                required
                style={{
                  borderColor: '#2E8B57',
                  backgroundColor: 'white',
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2E8B57' }}>
                Card Number
              </Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
                style={{
                  borderColor: '#2E8B57',
                  backgroundColor: 'white',
                }}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#2E8B57' }}>
                    Expiry Date
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                    style={{
                      borderColor: '#2E8B57',
                      backgroundColor: 'white',
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#2E8B57' }}>
                    CVV
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                    style={{
                      borderColor: '#2E8B57',
                      backgroundColor: 'white',
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#2E8B57' }}>
                    Billing Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="billingEmail"
                    value={formData.billingEmail}
                    onChange={handleInputChange}
                    placeholder="uhm@foo.com"
                    required
                    style={{
                      borderColor: '#2E8B57',
                      backgroundColor: 'white',
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#2E8B57' }}>
                    Billing Phone
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="billingPhone"
                    value={formData.billingPhone}
                    onChange={handleInputChange}
                    placeholder="(123) 456-7890"
                    required
                    style={{
                      borderColor: '#2E8B57',
                      backgroundColor: 'white',
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="saveCard"
                label="Save card for future purchases"
                checked={formData.saveCard}
                onChange={handleInputChange}
                style={{ color: '#2E8B57' }}
              />
            </Form.Group>
            <div className="d-grid">
              <Button
                type="submit"
                className="mt-3"
                style={{
                  backgroundColor: '#2E8B57',
                  borderColor: '#2E8B57',
                  padding: '12px',
                  fontSize: '1.1rem',
                }}
              >
                Complete Payment
              </Button>
            </div>
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={() => setShowTips(!showTips)}
                style={{
                  color: '#2E8B57',
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                }}
              >
                <LockFill />
                {' '}
                {showTips ? 'Hide' : 'Show'}
                {' '}
                Payment Security Tips
              </button>
            </div>

            {showTips && (
              <Alert
                className="mt-3"
                style={{
                  backgroundColor: 'rgba(46, 139, 87, 0.8)',
                  color: 'white',
                  borderColor: '#2F855A',
                }}
              >
                <ul className="mb-0">
                  <li>Your payment is encrypted and secure</li>
                  <li>We never store your full card details</li>
                  <li>Contact support if you notice any suspicious activity</li>
                </ul>
              </Alert>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPage />
    </Suspense>
  );
}
