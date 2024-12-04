/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-alert */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSession } from 'next-auth/react'; // Using next-auth to get the session
import { useRouter } from 'next/navigation';

// Validation schema
const AddBookSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  isbn: Yup.string().optional(),
  subject: Yup.string().oneOf(['math', 'english', 'science', 'history', 'other']).required('Subject is required'),
  courseName: Yup.string().optional(),
  courseCrn: Yup.string().optional(),
  description: Yup.string().optional(),
  price: Yup.number().positive().required('Price is required'),
  condition: Yup.string().oneOf(['new', 'excellent', 'good', 'fair', 'poor']).required('Condition is required'),
  owner: Yup.string().required('Owner is required'),
});

const AddBookForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    try {
      console.log('Submitting book data:', values);

      const bookData = {
        ...values,
        approved: false, // Set approved as false initially
      };

      const response = await axios.post('/api/sell', bookData);

      console.log('Response from server:', response.data);

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
    <Container>
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
        }}
        validationSchema={AddBookSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {/* Title */}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Field
                type="text"
                name="title"
                className={`form-control ${errors.title && touched.title ? 'is-invalid' : ''}`}
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage name="title" component="div" className="invalid-feedback" />
            </Form.Group>

            {/* ISBN (Optional) */}
            <Form.Group controlId="isbn">
              <Form.Label>ISBN (Optional)</Form.Label>
              <Field
                type="text"
                name="isbn"
                className="form-control"
                value={values.isbn}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            {/* Subject */}
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Field
                as="select"
                name="subject"
                className={`form-control ${errors.subject && touched.subject ? 'is-invalid' : ''}`}
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Subject</option>
                <option value="math">Math</option>
                <option value="english">English</option>
                <option value="science">Science</option>
                <option value="history">History</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage name="subject" component="div" className="invalid-feedback" />
            </Form.Group>

            {/* Course Name (Optional) */}
            <Form.Group controlId="courseName">
              <Form.Label>Course Name (Optional)</Form.Label>
              <Field
                type="text"
                name="courseName"
                className="form-control"
                value={values.courseName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            {/* Course CRN (Optional) */}
            <Form.Group controlId="courseCrn">
              <Form.Label>Course CRN (Optional)</Form.Label>
              <Field
                type="text"
                name="courseCrn"
                className="form-control"
                value={values.courseCrn}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            {/* Description (Optional) */}
            <Form.Group controlId="description">
              <Form.Label>Description (Optional)</Form.Label>
              <Field
                type="text"
                name="description"
                className="form-control"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            {/* Price */}
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Field
                type="number"
                name="price"
                className={`form-control ${errors.price && touched.price ? 'is-invalid' : ''}`}
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage name="price" component="div" className="invalid-feedback" />
            </Form.Group>

            {/* Condition */}
            <Form.Group controlId="condition">
              <Form.Label>Condition</Form.Label>
              <Field
                as="select"
                name="condition"
                className={`form-control ${errors.condition && touched.condition ? 'is-invalid' : ''}`}
                value={values.condition}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="new">New</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </Field>
              <ErrorMessage name="condition" component="div" className="invalid-feedback" />
            </Form.Group>

            {/* Owner */}
            <Form.Group controlId="owner">
              <Form.Label>Owner</Form.Label>
              <Field
                type="email"
                name="owner"
                className={`form-control ${errors.owner && touched.owner ? 'is-invalid' : ''}`}
                value={values.owner}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly
              />
              <ErrorMessage name="owner" component="div" className="invalid-feedback" />
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-4">
              Add Book
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddBookForm;
