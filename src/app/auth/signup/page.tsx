'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Button, Form } from 'react-bootstrap';
import { createUser } from '@/lib/dbActions';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

/** The sign-up page. */
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

  const onSubmit = async (data: SignUpForm) => {
    await createUser(data);
    await signIn('credentials', { callbackUrl: '/add', ...data });
  };

  const styles = {
    main: {
      backgroundColor: '#225f49',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: 'lightGray',
      padding: '50px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '600px',
    },
    title: {
      fontSize: '2.5em',
    },
    formGroup: {
      marginTop: '15px',
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

  return (
    <main style={styles.main}>
      <Card className="shadow" style={styles.card}>
        <Card.Body>
          <h1 className="mb-4" style={styles.title}>Sign Up</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="form-group" style={styles.formGroup}>
              <Form.Label>Email</Form.Label>
              <input
                type="text"
                {...register('email')}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </Form.Group>

            <Form.Group className="form-group" style={styles.formGroup}>
              <Form.Label>Password</Form.Label>
              <input
                type="password"
                {...register('password')}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </Form.Group>

            <Form.Group className="form-group" style={styles.formGroup}>
              <Form.Label>Confirm Password</Form.Label>
              <input
                type="password"
                {...register('confirmPassword')}
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
            </Form.Group>

            <Form.Group className="form-group py-3">
              <Button type="submit" className="btn btn-primary w-100" style={styles.button}>
                Sign Up
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
        <hr style={styles.divider} />
        <Card.Footer className="d-flex justify-content-center align-items-center">
          Already have an account?&nbsp;
          <a href="/auth/signin">Log in</a>
        </Card.Footer>
      </Card>
    </main>
  );
};

export default SignUp;
