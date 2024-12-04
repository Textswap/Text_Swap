'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { createUser } from '@/lib/dbActions';
import { BookCheck } from 'lucide-react';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
  // acceptTerms: boolean;
};

/** The sign up page. */
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
    // console.log(JSON.stringify(data, null, 2));
    await createUser(data);
    // After creating, signIn with redirect to the add page
    await signIn('credentials', { callbackUrl: '/add', ...data });
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
                  TextSwap
                  {' '}
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
                  Sign Up
                </p>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group
                    className="form-group"
                    style={{ paddingTop: '20px' }}
                  >
                    <Form.Label
                      style={{ marginBottom: '0.1rem', color: '#225f49' }}
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

                  <Form.Group
                    className="form-group"
                    style={{ paddingTop: '15px' }}
                  >
                    <Form.Label
                      style={{ marginBottom: '0.1rem', color: '#225f49' }}
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
                  <Form.Group
                    className="form-group"
                    style={{ paddingTop: '15px', paddingBottom: '25px' }}
                  >
                    <Form.Label
                      style={{ marginBottom: '0.1rem', color: '#225f49' }}
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
                          Sign Up
                        </Button>
                      </Col>
                      {/*
                      <Col>
                        <Button type="button" onClick={() => reset()} className="btn btn-warning float-right">
                          Reset
                        </Button>
                      </Col>
                    */}
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
                Already have an account?&nbsp;
                <a href="/auth/signin">Log in</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignUp;
