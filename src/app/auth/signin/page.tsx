'use client';

import { signIn } from 'next-auth/react';
import { Button, Card, Form } from 'react-bootstrap';

const styles = {
  main: {
    backgroundColor: '#225f49',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'lightGray',
    padding: '50px',
    width: '600px',
  },
  title: {
    fontSize: '2.5em',
  },
  formGroup: {
    paddingTop: '20px',
  },
  formGroupPassword: {
    paddingTop: '30px',
    paddingBottom: '20px',
  },
  button: {
    backgroundColor: '#225f49',
    borderRadius: '20px',
  },
  divider: {
    border: '0',
    borderTop: '4px solid #225f49',
    marginBottom: '20px',
  },
};

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
    <main style={styles.main}>
      <Card className="shadow" style={styles.card}>
        <Card.Body>
          <h1 className="mb-4" style={styles.title}>Log In</h1>
          <Form method="post" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="form-group" style={styles.formGroup}>
              <Form.Label>Email</Form.Label>
              <input name="email" type="text" className="form-control" />
            </Form.Group>
            <Form.Group style={styles.formGroupPassword}>
              <Form.Label>Password</Form.Label>
              <input name="password" type="password" className="form-control" />
            </Form.Group>
            <Form.Group className="form-group py-3">
              <Button type="submit" className="btn btn-primary w-100" style={styles.button}>
                Log In
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
        <hr style={styles.divider} />
        <Card.Footer className="d-flex justify-content-center align-items-center">
          Don&apos;t have an account?&nbsp;
          <a href="/auth/signup">Sign up</a>
        </Card.Footer>
      </Card>
    </main>
  );
};

export default SignIn;
