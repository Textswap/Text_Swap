import * as Yup from 'yup';

export const AddBookSchema = Yup.object({
  title: Yup.string().required(),
  isbn: Yup.string().required(),
  subject: Yup.string().oneOf(['math', 'english', 'science', 'history', 'other']).required(),
  courseName: Yup.string().required(),
  courseCrn: Yup.string().required(),
  images: Yup.mixed().required(),
  description: Yup.string().required(),
  price: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['new', 'excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditBookSchema = Yup.object({
  id: Yup.number().required(),
  title: Yup.string().required(),
  isbn: Yup.string().required(),
  subject: Yup.string().oneOf(['math', 'english', 'science', 'history', 'other']).required(),
  courseName: Yup.string().required(),
  courseCrn: Yup.string().required(),
  images: Yup.array().of(Yup.string()).required(),
  description: Yup.string().required(),
  price: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['new', 'excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});
