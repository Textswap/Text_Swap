'use client';

import { signIn } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { BookCheck } from 'lucide-react';

const SignIn = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    const result = await signIn('credentials', {
      callbackUrl: '/buy',
      email,
      password,
    });

    if (result?.error) {
      console.error('Sign in failed: ', result.error);
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
        padding: '5rem 0',
      }}
    >
      {' '}
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <Card
              className="shadow"
              style={{
                backgroundColor: '#c8e6c9',
                padding: '50px',
                width: '600px',
              }}
            >
              <Card.Body>
                <h1
                  className="mb-4"
                  style={{
                    fontSize: '4rem',
                    fontWeight: '900',
                    background: 'linear-gradient(to right, #39af3f, #318768)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: 'center',
                  }}
                >
                  TextSwap{' '}
                  <BookCheck
                    style={{
                      width: '60px',
                      height: '60px',
                      color: '#318768',
                    }}
                  />
                </h1>
                <p
                  className="mb-4"
                  style={{
                    fontSize: '1.8em',
                    color: '#225f49',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Log In
                </p>
                <Form method="post" onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail" className="form-group" style={{ paddingTop: '20px' }}>
                    <Form.Label style={{ marginBottom: '0.1rem', color: '#225f49' }}>Email</Form.Label>
                    <input name="email" type="text" className="form-control" />
                  </Form.Group>
                  <Form.Group style={{ paddingTop: '30px', paddingBottom: '20px' }}>
                    <Form.Label style={{ marginBottom: '0.1rem', color: '#225f49' }}>Password</Form.Label>
                    <input name="password" type="password" className="form-control" />
                  </Form.Group>
                  <Form.Group className="form-group py-3">
                    <Row>
                      <Col>
                        <Button
                          type="submit"
                          className="btn btn-primary w-100"
                          style={{
                            backgroundColor: '#225f49',
                            borderRadius: '20px',
                            borderColor: 'white',
                          }}
                        >
                          Log In
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Body>
              <hr
                style={{
                  border: '0',
                  borderTop: '4px solid #225f49',
                  marginBottom: '20px',
                }}
              />
              <Card.Footer className="d-flex justify-content-center align-items-center">
                Don&apos;t have an account?&nbsp;
                <a href="/auth/signup">Sign up</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignIn;
