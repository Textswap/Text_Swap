'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row, Alert } from 'react-bootstrap';
import { createUser, checkUserExists } from '@/lib/dbActions';
import { BookCheck } from 'lucide-react';
import React from 'react';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const onSubmit = async (data: SignUpForm) => {
    // Clear any previous error messages
    setErrorMessage(null);
  
    try {
      // Check if a user with the given email already exists
      const userExists = await checkUserExists(data.email);
  
      if (userExists) {
        setErrorMessage('Account already exists with this email address.');
        return; // Stop execution if user exists
      }
  
      // Create a new user with the provided data
      await createUser(data);
  
      // Sign in the newly created user
      await signIn('credentials', { 
        callbackUrl: '/buy', // Redirect after successful login
        ...data, // Pass the form data to the sign-in function
      });
    } catch (error) {
      // Generic error handling for unexpected issues
      console.error('Error during sign-up process:', error);
      setErrorMessage('An error occurred while creating your account. Please try again.');
    }
  };
  

  return (
    <main
      style={{
        backgroundColor: '#e1f4e2',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 1rem', // Adjusted for better responsiveness
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card
              className="shadow"
              style={{
                backgroundColor: '#c8e6c9',
                padding: '2rem',
                borderRadius: '1rem',
              }}
            >
              <Card.Body>
                <h1
                  className="mb-4"
                  style={{
                    fontSize: '3rem', // Adjusted font size for smaller screens
                    fontWeight: '900',
                    background: 'linear-gradient(to right, #39af3f, #318768)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center',
                  }}
                >
                  TextSwap
                  {' '}
                  <BookCheck
                    style={{
                      width: '50px',
                      height: '50px',
                      color: '#318768',
                      marginLeft: '10px',
                    }}
                  />
                </h1>
                <p
                  className="mb-4"
                  style={{
                    fontSize: '1.2rem',
                    color: '#225f49',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Sign Up
                </p>

                {errorMessage && (
                  <Alert variant="danger" className="mb-4">
                    {errorMessage}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="form-group">
                    <Form.Label
                      style={{
                        marginBottom: '0.5rem',
                        color: '#225f49',
                        fontWeight: 'bold',
                      }}
                    >
                      Email
                    </Form.Label>
                    <input
                      type="text"
                      {...register('email')}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">
                      {errors.email?.message}
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group mt-3">
                    <Form.Label
                      style={{
                        marginBottom: '0.5rem',
                        color: '#225f49',
                        fontWeight: 'bold',
                      }}
                    >
                      Password
                    </Form.Label>
                    <input
                      type="password"
                      {...register('password')}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">
                      {errors.password?.message}
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group mt-3">
                    <Form.Label
                      style={{
                        marginBottom: '0.5rem',
                        color: '#225f49',
                        fontWeight: 'bold',
                      }}
                    >
                      Confirm Password
                    </Form.Label>
                    <input
                      type="password"
                      {...register('confirmPassword')}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">
                      {errors.confirmPassword?.message}
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group py-3">
                    <Button
                      type="submit"
                      className="btn btn-primary w-100"
                      style={{
                        backgroundColor: '#225f49',
                        borderRadius: '20px',
                        borderColor: 'white',
                        padding: '0.75rem',
                        fontSize: '1rem',
                      }}
                    >
                      Sign Up
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
              <hr
                style={{
                  border: '0',
                  borderTop: '2px solid #225f49',
                  margin: '1rem 0',
                }}
              />
              <Card.Footer className="d-flex justify-content-center align-items-center">
                Already have an account?&nbsp;
                <a href="/auth/signin" style={{ color: '#225f49' }}>
                  Log in
                </a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignUp;
