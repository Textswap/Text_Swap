'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Card, Row, Col } from 'react-bootstrap';

const styles = {
  main: {
    backgroundColor: '#f8f9fa', // Light gray background for the whole page
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff', // White background for the card
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for the card
    textAlign: 'center',
    width: '400px',
  },
  buttonRow: {
    marginTop: '20px',
  },
};

const SignOut = () => {
  const router = useRouter();

  return (
    <main style={styles.main}>
      <Card style={styles.card}>
        <Card.Body>
          <h2>Do you want to sign out?</h2>
          <Row style={styles.buttonRow}>
            <Col>
              <Button
                variant="danger"
                className="w-100"
                onClick={() => signOut({ callbackUrl: '/', redirect: true })}
              >
                Sign Out
              </Button>
            </Col>
            <Col>
              <Button
                variant="secondary"
                className="w-100"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </main>
  );
};

export default SignOut;
