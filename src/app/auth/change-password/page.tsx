'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { Lock } from 'lucide-react';
import { changePassword } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';

type ChangePasswordForm = {
  oldpassword: string;
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const email = session?.user?.email || '';

  const validationSchema = Yup.object().shape({
    oldpassword: Yup.string().required('Old Password is required'),
    password: Yup.string()
      .required('New Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    await changePassword({ email, ...data });
    await swal('Password Changed', 'Your password has been changed', 'success', { timer: 2000 });
    reset();
    router.push('/buy');
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

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
                  Change Password
                  <Lock
                    style={{
                      width: '50px',
                      height: '50px',
                      color: '#318768',
                      marginLeft: '10px',
                    }}
                  />
                </h1>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="formOldPassword" className="form-group">
                    <Form.Label
                      style={{
                        marginBottom: '0.5rem',
                        color: '#225f49',
                        fontWeight: 'bold',
                      }}
                    >
                      Old Password
                    </Form.Label>
                    <input
                      type="password"
                      {...register('oldpassword')}
                      className={`form-control ${errors.oldpassword ? 'is-invalid' : ''}`}
                      required
                    />
                    <div className="invalid-feedback">{errors.oldpassword?.message}</div>
                  </Form.Group>
                  <Form.Group controlId="formNewPassword" className="form-group mt-3">
                    <Form.Label
                      style={{
                        marginBottom: '0.5rem',
                        color: '#225f49',
                        fontWeight: 'bold',
                      }}
                    >
                      New Password
                    </Form.Label>
                    <input
                      type="password"
                      {...register('password')}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      required
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </Form.Group>
                  <Form.Group controlId="formConfirmPassword" className="form-group mt-3">
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
                      required
                    />
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
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
                      Change Password
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ChangePassword;
