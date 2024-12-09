'use client';

import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import styles from './AccountPageClient.module.css';

// Define a type for the form data to use TypeScript benefits
interface AccountFormData {
  name: string;
  email: string;
  password: string;
}

const AccountPage: React.FC = () => {
  const [formData, setFormData] = useState<AccountFormData>({
    name: '',
    email: '',
    password: '',
  });

  const [status, setStatus] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const response = await fetch('/api/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Account created successfully!');
        setFormData({ name: '', email: '', password: '' });
      } else {
        setStatus(data.message || 'There was an error creating the account.');
      }
    } catch (error) {
      setStatus('There was an error connecting to the server.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create Account</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {status && (
          <Alert variant={status === 'Account created successfully!' ? 'success' : 'danger'}>
            {status}
          </Alert>
        )}

        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default AccountPage;
