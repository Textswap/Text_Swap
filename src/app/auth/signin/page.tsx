'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { BookCheck } from 'lucide-react';

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    setFormValues({ email, password }); // Preserve values on error

    const result = await signIn('credentials', {
      redirect: false, // Prevent automatic redirect
      email,
      password,
    });

    if (!result || result.error) {
      setErrorMessage('Failed to log in. Please check your email and password.');
    } else {
      setErrorMessage(''); // Clear error message on success
      router.push('/buy'); // Redirect to buy page
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
        padding: '2rem 1rem',
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
                    fontSize: '3rem',
                    fontWeight: '900',
                    background: 'linear-gradient(to right, #39af3f, #318768)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center',
                  }}
                >
                  TextSwap
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
                  Log In
                </p>
                {errorMessage && (
                  <div
                    style={{
                      color: 'red',
                      marginBottom: '1rem',
                      textAlign: 'center',
                    }}
                  >
                    {errorMessage}
                  </div>
                )}
                <Form method="post" onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail" className="form-group">
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
                      name="email"
                      type="text"
                      className="form-control"
                      required
                      defaultValue={formValues.email}
                    />
                  </Form.Group>
                  <Form.Group
                    className="form-group mt-3"
                    controlId="formBasicPassword"
                  >
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
                      name="password"
                      type="password"
                      className="form-control"
                      required
                      defaultValue={formValues.password}
                    />
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
                      Log In
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
                Don&apos;t have an account?&nbsp;
                <a href="/auth/signup" style={{ color: '#225f49' }}>
                  Sign up
                </a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignIn;
