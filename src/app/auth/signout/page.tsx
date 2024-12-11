'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Row, Col } from 'react-bootstrap';
import { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
  main: {
    backgroundColor: '#c8e6c9',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as 'center',
    width: '400px',
  },
  header: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  buttonRow: {
    marginTop: '20px',
  },
};

const SignOut = () => {
  const router = useRouter();

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <div style={styles.header}>Do you want to sign out?</div>
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
      </div>
    </main>
  );
};

export default SignOut;
