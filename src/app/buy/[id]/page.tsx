'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import defaultTextbooks from '@/components/defaultTextbooks';
import styles from './BookDetails.module.css';

const BookDetails: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id;

  const textbook = defaultTextbooks.find((book) => book.id === Number(bookId));

  if (!textbook) {
    return (
      <div className={styles.container}>
        <h1>404 - Textbook Not Found</h1>
        <p>We couldn’t find the textbook you’re looking for.</p>
        <button
          type="button"
          onClick={() => router.back()}
          className={styles.goBackButton}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Left Side: Picture */}
      <div className={styles.pictureContainer}>
        <img
          src={textbook.picture}
          alt={textbook.title}
          className={styles.picture}
        />
      </div>

      {/* Right Side: Details */}
      <div className={styles.detailsContainer}>
        <h1 className={styles.title}>{textbook.title}</h1>
        <p className={styles.price}>
          $
          {textbook.price}
        </p>
        <p className={styles.condition}>{textbook.condition}</p>

        <div className={styles.buttonsContainer}>
          <button type="button" className={styles.button}>
            Buy Now
          </button>
          <button type="button" className={styles.button}>
            Add to Cart
          </button>
        </div>

        <p className={styles.description}>
          <strong>Description:</strong>
          {' '}
          {textbook.description || 'No description available.'}
        </p>

        <div className={styles.sellerContainer}>
          <img
            src={textbook.picture}
            alt="Seller profile"
            className={styles.sellerImage}
          />
          <div>
            <p className={styles.sellerDetails}>Sold by username</p>
            <button type="button" className={styles.messageButton}>
              Message Seller
            </button>
          </div>
        </div>

        {/* Go Back Button */}
        <button
          type="button"
          onClick={() => router.back()}
          className={styles.goBackButton}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
