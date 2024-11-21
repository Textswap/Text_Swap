'use client';

import { signIn } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

/** The sign in page. */
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
    <main style={{ backgroundColor: '#225f49', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <Card
              className="shadow"
              style={{
                backgroundColor: 'lightGray',
                padding: '50px',
                width: '600px',
              }}
            >
              <Card.Body>
                <h1 className="mb-4" style={{ fontSize: '2.5em' }}>Log In</h1>
                <Form method="post" onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail" className="form-group" style={{ paddingTop: '20px' }}>
                    <Form.Label style={{ marginBottom: '0.1rem' }}>Email</Form.Label>
                    <input name="email" type="text" className="form-control" />
                  </Form.Group>
                  <Form.Group style={{ paddingTop: '30px', paddingBottom: '20px' }}>
                    <Form.Label style={{ marginBottom: '0.1rem' }}>Password</Form.Label>
                    <input name="password" type="password" className="form-control" />
                  </Form.Group>
                  <Form.Group className="form-group py-3">
                    <Row>
                      <Col>
                        <Button
                          type="submit"
                          className="btn btn-primary w-100"
                          style={{ backgroundColor: '#225f49', borderRadius: '20px' }}
                        >
                          Log In
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Body>
              <hr style={{
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
