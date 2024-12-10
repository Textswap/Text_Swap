/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';

export const AddBookSchema = Yup.object({
  title: Yup.string().required(),
  isbn: Yup.string().optional(),
  subject: Yup.string().oneOf(['math', 'english', 'science', 'history', 'other']).required(),
  courseName: Yup.string().optional(),
  courseCrn: Yup.string().optional(),
  description: Yup.string().optional(),
  price: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['new', 'excellent', 'good', 'fair', 'poor']).required(),
  imageURL: Yup.string().optional(),
  owner: Yup.string().required(),
});

export const EditBookSchema = Yup.object({
  id: Yup.number().required(),
  title: Yup.string().required(),
  isbn: Yup.string().optional(),
  subject: Yup.string().oneOf(['math', 'english', 'science', 'history', 'other']).required(),
  courseName: Yup.string().optional(),
  courseCrn: Yup.string().optional(),
  description: Yup.string().optional(),
  price: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  imageURL: Yup.string().optional(),
  owner: Yup.string().required(),
});
