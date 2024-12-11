'use client';

import React, { useState } from 'react';
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentPage: React.FC = () => {
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
    console.log('Payment submitted', formData);
    alert('Payment processing (simulated)');
  };

  const cardNetworks = [
    { value: 'visa', label: 'Visa' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'amex', label: 'American Express' },
    { value: 'discover', label: 'Discover' },
  ];

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center min-vh-100 p-4"
      style={{
        backgroundColor: 'var(--secondary-color)',
      }}
    >
      {/* Page Header Section */}
      <div
        className="text-center mb-4 p-4"
        style={{
          maxWidth: '700px',
          backgroundColor: 'var(--main-color)',
          color: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        <h1 className="display-5 mb-3">Complete Your Payment</h1>
        <p className="lead">
          You&apos;re just one step away from finalizing your transaction. Please
          complete your payment to confirm your order.
        </p>
        <div
          className="mt-3 p-3 rounded"
          style={{
            backgroundColor: 'var(--main-color-darker)',
            color: 'white',
          }}
        >
          <strong>Need Assistance?</strong>
          <p className="mb-0 mt-1">
            For payment-related concerns or inquiries, you can email us directly
            at
            {' '}
            <strong>textswap@foo.com</strong>
            . Our team is here to help!
            {' '}
          </p>
        </div>
      </div>

      <Card
        className="w-100 shadow-lg"
        style={{
          maxWidth: '600px',
          borderColor: 'var(--main-color)',
          borderWidth: '2px',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Card.Header
          className="text-center py-4"
          style={{
            backgroundColor: 'var(--main-color)',
            color: 'white',
          }}
        >
          <h2 className="mb-0">Secure Payment</h2>
          <small className="text-light">Complete your transaction safely</small>
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: 'var(--main-color-darker)' }}>
                    Card Type
                  </Form.Label>
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
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: 'var(--main-color-darker)' }}>
                    Card Network
                  </Form.Label>
                  <Form.Select
                    name="cardNetwork"
                    value={formData.cardNetwork}
                    onChange={handleInputChange}
                    style={{
                      borderColor: 'var(--main-color)',
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
              <Form.Label style={{ color: 'var(--main-color-darker)' }}>
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
                  borderColor: 'var(--main-color)',
                  backgroundColor: 'white',
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--main-color-darker)' }}>
                Card Number
              </Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 90"
                required
                style={{
                  borderColor: 'var(--main-color)',
                  backgroundColor: 'white',
                }}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: 'var(--main-color-darker)' }}>
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
                      borderColor: 'var(--main-color)',
                      backgroundColor: 'white',
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: 'var(--main-color-darker)' }}>
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
                      borderColor: 'var(--main-color)',
                      backgroundColor: 'white',
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: 'var(--main-color-darker)' }}>
                    Billing Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="billingEmail"
                    value={formData.billingEmail}
                    onChange={handleInputChange}
                    placeholder="uhm@example.com"
                    required
                    style={{
                      borderColor: 'var(--main-color)',
                      backgroundColor: 'white',
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: 'var(--main-color-darker)' }}>
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
                      borderColor: 'var(--main-color)',
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
                style={{ color: 'var(--main-color-darker)' }}
              />
            </Form.Group>

            <div className="d-grid">
              <Button
                type="submit"
                className="mt-3"
                style={{
                  backgroundColor: 'var(--main-color)',
                  borderColor: 'var(--main-color-darker)',
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
                  color: 'var(--main-color-darker)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                  fontSize: 'inherit',
                }}
              >
                {showTips ? 'Hide' : 'Show'}
                {' '}
                Payment Security Tips
              </button>
            </div>

            {showTips && (
              <Alert variant="info" className="mt-3">
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

export default PaymentPage;
