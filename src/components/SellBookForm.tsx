/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-alert */
// components/BookListingForm.tsx

// components/BookListingForm.tsx

'use client';

import React, { useState, useRef } from 'react';
import { Camera, X } from 'react-bootstrap-icons';
import styles from '../app/sell/SellPage.module.css';

const SellBookForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreview(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreview(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      if (fileInputRef.current?.files?.[0]) {
        formData.set('image', fileInputRef.current.files[0]);
      }

      const response = await fetch('/api/listbooks', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      const responseText = await response.text();

      if (!response.ok) {
        const errorData = JSON.parse(responseText);
        throw new Error(errorData.error || 'Failed to create book listing');
      }

      const book = JSON.parse(responseText);
      formRef.current?.reset();
      setImagePreview(null);
      alert('Book listed successfully!');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create book listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
      <div
        className={`${styles.imageUpload} ${isDragging ? styles.dragging : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="imageUrl"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className={styles.hiddenInput}
        />
        {imagePreview ? (
          <div className={styles.imagePreviewContainer}>
            <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
            <div className={styles.overlayActions}>
              <label htmlFor="imageUrl" className={styles.uploadLabelOverlay}>
                <Camera className={styles.cameraIcon} />
              </label>
              <button type="button" className={styles.removeButton} onClick={handleRemoveImage}>
                <X className={styles.removeIcon} />
              </button>
            </div>
          </div>
        ) : (
          <label htmlFor="imageUrl" className={styles.uploadLabel}>
            <Camera className={styles.cameraLargeIcon} />
            <span className={styles.uploadText}>Drop an image here or click to upload</span>
          </label>
        )}
      </div>

      <div className={styles.formFields}>
        <div className={styles.field}>
          <label htmlFor="title">Book Title</label>
          <input type="text" id="title" name="title" placeholder="Enter the book title" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" name="author" placeholder="Enter the author's name" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="isbn">ISBN</label>
          <input type="text" id="isbn" name="isbn" placeholder="Enter the ISBN number" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="category">Subject</label>
          <select id="category" name="category" required defaultValue="">
            <option value="" disabled>
              Select the subject
            </option>
            {/* Add options here */}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="courseName">Course Name</label>
          <input type="text" id="courseName" name="courseName" placeholder="Enter the course name" />
        </div>

        <div className={styles.field}>
          <label htmlFor="courseCrn">Course CRN</label>
          <input type="text" id="courseCrn" name="courseCrn" placeholder="Enter the course CRN" />
        </div>

        <div className={styles.field}>
          <label htmlFor="price">Price</label>
          <input type="number" id="price" name="price" step="0.01" placeholder="Enter the price ($)" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="condition">Condition</label>
          <select id="condition" name="condition" required defaultValue="">
            <option value="" disabled>
              Select the condition
            </option>
            {/* Add condition options */}
          </select>
        </div>

        <div className={styles.buttons}>
          <button type="submit" className={styles.confirmButton} disabled={loading}>
            {loading ? 'Creating...' : 'Confirm'}
          </button>
          <button type="button" className={styles.deleteButton} disabled={loading}>
            Delete
          </button>
        </div>
      </div>
    </form>
  );
};

export default SellBookForm;
