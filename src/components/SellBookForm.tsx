import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from '../styles/ListPage.module.css';

// Validation schema
const AddBookSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  isbn: Yup.string().optional(),
  subject: Yup.string()
    .oneOf(['math', 'english', 'science', 'history', 'other'])
    .required('Subject is required'),
  courseName: Yup.string().optional(),
  courseCrn: Yup.string().optional(),
  description: Yup.string().optional(),
  price: Yup.number().positive().required('Price is required'),
  condition: Yup.string()
    .oneOf(['new', 'excellent', 'good', 'fair', 'poor'])
    .required('Condition is required'),
  imageURL: Yup.string().optional(),
  owner: Yup.string().required('Owner is required'),
});

const AddBookForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    try {
      const bookData = { ...values, approved: false };
      await axios.post('/api/sell', bookData);
      alert('Book added successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('An error occurred while adding the book.');
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className={styles.container}>
      <Formik
        initialValues={{
          title: '',
          isbn: '',
          subject: '',
          courseName: '',
          courseCrn: '',
          description: '',
          price: '',
          condition: 'new',
          owner: session?.user?.email || '',
          imageURL: '',
        }}
        validationSchema={AddBookSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="justify-content-center">
              {/* Section 1: Image Upload */}
              <Col xs={12} md={4} className="d-flex align-items-center justify-content-center">
                <div className={styles.imageUpload}>
                  <label htmlFor="imageURL" className={styles.uploadLabel}>
                  <i className="bi bi-camera" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                    <p className={styles.uploadText}>Click or Drag Image Here</p>
                  </label>
                  <Field
                    type="text"
                    name="imageURL"
                    id="imageURL"
                    className={styles.hiddenInput}
                    value={values.imageURL}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {values.imageURL && (
                    <div className={styles.imagePreviewContainer}>
                      <img src={values.imageURL} alt="Preview" className={styles.imagePreview} />
                    </div>
                  )}
                </div>
              </Col>

              {/* Section 2: First 4 Fields */}
              <Col xs={12} md={4}>
                <div className={styles.field}>
                  <label htmlFor="title">Title</label>
                  <Field
                    type="text"
                    name="title"
                    className={`form-control ${errors.title && touched.title ? 'is-invalid' : ''}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="title" component="div" className="invalid-feedback" />
                </div>

                <div className={styles.field}>
                  <label htmlFor="subject">Subject</label>
                  <Field
                    as="select"
                    name="subject"
                    className={`${styles.select} form-control`} // Add custom styles
                  >
                    <option value="">Select Subject</option>
                    <option value="math">Math</option>
                    <option value="english">English</option>
                    <option value="science">Science</option>
                    <option value="history">History</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage name="subject" component="div" className="invalid-feedback" />
                </div>

                <div className={styles.field}>
                  <label htmlFor="courseName">Course Name (Optional)</label>
                  <Field
                    type="text"
                    name="courseName"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="isbn">ISBN (Optional)</label>
                  <Field
                    type="text"
                    name="isbn"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </Col>

              {/* Section 3: Next 4 Fields */}
              <Col xs={12} md={4}>

                <div className={styles.field}>
                  <label htmlFor="price">Price</label>
                  <Field
                    type="number"
                    name="price"
                    className={`form-control ${errors.price && touched.price ? 'is-invalid' : ''}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="price" component="div" className="invalid-feedback" />
                </div>

                <div className={styles.field}>
                  <label htmlFor="condition">Condition</label>
                  <Field
                    as="select"
                    name="condition"
                    className={`${styles.select} form-control`} // Add custom styles
                  >
                    <option value="new">New</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </Field>
                  <ErrorMessage name="condition" component="div" className="invalid-feedback" />
                </div>


                <div className={styles.field}>
                  <label htmlFor="courseCrn">Course CRN (Optional)</label>
                  <Field
                    type="text"
                    name="courseCrn"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="description">Description (Optional)</label>
                  <Field
                    as="textarea"
                    name="description"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col className="text-center">
                <Button type="submit" className={styles.confirmButton}>
                  Add Book
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddBookForm;
