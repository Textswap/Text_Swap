'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { LogOut } from 'lucide-react';

const SignOut = () => {
  const router = useRouter();

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
                  Sign Out
                  <LogOut
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
                  Are you sure you want to sign out?
                </p>
                <Row className="py-3">
                  <Col>
                    <Button
                      variant="danger"
                      className="w-100"
                      style={{
                        backgroundColor: '#d9534f',
                        borderRadius: '20px',
                        borderColor: 'white',
                        padding: '0.75rem',
                        fontSize: '1rem',
                      }}
                      onClick={() => signOut({ callbackUrl: '/', redirect: true })}
                    >
                      Sign Out
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="secondary"
                      className="w-100"
                      style={{
                        backgroundColor: 'gray',
                        borderRadius: '20px',
                        borderColor: 'white',
                        padding: '0.75rem',
                        fontSize: '1rem',
                      }}
                      onClick={() => router.back()}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignOut;
