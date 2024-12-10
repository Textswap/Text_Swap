/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useRef, useState } from 'react';
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
    .oneOf([
      'math',
      'english',
      'science',
      'history',
      'other',
      'architecture',
      'art',
      'business',
      'engineering',
      'law',
      'medicine',
      'music',
      'religion',
      'language',
    ])
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const onSubmit = async (values: any) => {
    console.log('Form submitted with values:', values); // Add this for debugging
    try {
      const bookData = { ...values, approved: false };
      const response = await axios.post('/api/sell', bookData); // Corrected
      console.log('API Response:', response.data); // Corrected
      alert('Your book has been added! It will appear in the marketplace after review and admin approval.');
      try {
        router.push('/buy');
      } catch (navigationError) {
        console.error('Error during navigation:', navigationError);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('An error occurred while adding the book.');
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const file = event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFieldValue('imageURL', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    const file = event.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setFieldValue('imageURL', reader.result);
      };
      reader.readAsDataURL(file);
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
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="justify-content-center">
              {/* Section 1: Image Upload */}
              <Col
                xs={12}
                md={4}
                className="d-flex flex-column align-items-center"
              >
                <div
                  className={`${styles.imageUpload} ${isDragOver ? styles.dragOver : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, setFieldValue)}
                >
                  <label
                    htmlFor="imageUpload"
                    className={styles.uploadLabel}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {!values.imageURL && (
                      <>
                        <i
                          className="bi bi-camera"
                          style={{ fontSize: '3rem', color: '#6c757d' }}
                        />
                        <p className={styles.uploadText}>
                          {isDragOver
                            ? 'Drop Image Here'
                            : 'Click or Drag Image Here'}
                        </p>
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    name="imageUpload"
                    id="imageUpload"
                    accept="image/*"
                    className={styles.hiddenInput}
                    onChange={(event) => handleFileChange(event, setFieldValue)}
                  />
                  {values.imageURL && (
                    <div className={styles.imagePreviewContainer}>
                      <img
                        src={values.imageURL}
                        alt="Preview"
                        className={styles.imagePreviewFull}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={`${styles.field} mt-3`}
                  style={{ width: '100%' }}
                >
                  <label htmlFor="imageURL">Or Enter Image URL</label>
                  <Field
                    type="text"
                    name="imageURL"
                    id="imageURL"
                    className="form-control"
                    onChange={(e: { target: { value: any } }) => {
                      handleChange(e);
                      if (e.target.value) {
                        setFieldValue('imageURL', e.target.value);
                      }
                    }}
                    onBlur={handleBlur}
                  />
                </div>
              </Col>

              {/* Section 2: First 4 Fields */}
              <Col xs={12} md={4}>
                <div className={styles.field}>
                  <label htmlFor="title">Title</label>
                  <Field
                    type="text"
                    name="title"
                    id="title"
                    className={`form-control ${errors.title && touched.title ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="subject">Subject</label>
                  <Field as="select" name="subject" className="form-control">
                    <option value="">Select Subject</option>
                    {[
                      'Architecture',
                      'Art',
                      'Business',
                      'Engineering',
                      'English',
                      'History',
                      'Language',
                      'Law',
                      'Math',
                      'Medicine',
                      'Music',
                      'Other',
                      'Religion',
                      'Science',
                    ]
                      .sort((a, b) => a.localeCompare(b))
                      .map((subject) => (
                        <option
                          key={subject.toLowerCase()}
                          value={subject.toLowerCase()}
                        >
                          {subject}
                        </option>
                      ))}
                  </Field>
                  <ErrorMessage
                    name="subject"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="courseName">Course Name (Optional)</label>
                  <Field
                    type="text"
                    name="courseName"
                    className="form-control"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="isbn">ISBN (Optional)</label>
                  <Field type="text" name="isbn" className="form-control" />
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
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="condition">Condition</label>
                  <Field as="select" name="condition" className="form-control">
                    <option value="new">New</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </Field>
                  <ErrorMessage
                    name="condition"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="courseCrn">Course CRN (Optional)</label>
                  <Field
                    type="text"
                    name="courseCrn"
                    className="form-control"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="description">Description (Optional)</label>
                  <Field
                    as="textarea"
                    name="description"
                    className="form-control"
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
