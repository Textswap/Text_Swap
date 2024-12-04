/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React from 'react';
import { Container } from 'react-bootstrap';
import SellBookForm from '@/components/SellBookForm';
import styles from './SellPage.module.css';

const ListPage: React.FC = () => (
  <main className={styles.main}>
    <Container fluid className={styles.container}>
      <h1 className={styles.title}>List a book</h1>
      <SellBookForm />
    </Container>
  </main>
);

export default ListPage;
