'use client';

import React, { useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { Camera, X } from 'react-bootstrap-icons';
import styles from '@/styles/ListPage.module.css';

const ListPage: React.FC = () => {
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

      // Add the image file if it exists
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

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response content:', responseText);

      if (!response.ok) {
        const errorData = JSON.parse(responseText); // Parse error response
        throw new Error(errorData.error || 'Failed to create book listing');
      }

      const book = JSON.parse(responseText);
      console.log('API response:', book);

      // Reset form and image preview on success
      formRef.current?.reset();
      setImagePreview(null);
      alert('Book listed successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to create book listing. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <Container id="list" fluid className={styles.container}>
        <h1 className={styles.title}>List a book</h1>
        <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
          {/* Left side - Image upload */}
          <div
            className={`${styles.imageUpload} ${
              isDragging ? styles.dragging : ''
            }`}
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
                <img
                  src={imagePreview}
                  alt="Preview"
                  className={styles.imagePreview}
                />
                <div className={styles.overlayActions}>
                  <label
                    htmlFor="imageUrl"
                    className={styles.uploadLabelOverlay}
                  >
                    <Camera className={styles.cameraIcon} />
                  </label>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={handleRemoveImage}
                  >
                    <X className={styles.removeIcon} />
                  </button>
                </div>
              </div>
            ) : (
              <label htmlFor="imageUrl" className={styles.uploadLabel}>
                <Camera className={styles.cameraLargeIcon} />
                <span className={styles.uploadText}>
                  Drop an image here or click to upload
                </span>
              </label>
            )}
          </div>

          <div className={styles.formFields}>
            <div className={styles.field}>
              <label htmlFor="title">Book Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter the book title"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                placeholder="Enter the author's name"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                placeholder="Enter the ISBN number"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="category">Subject</label>
              <select id="category" name="category" required defaultValue="">
                <option value="" disabled>
                  Select the subject
                </option>
                <option value="Architecture">Architecture</option>
                <option value="Art">Art</option>
                <option value="Business">Business</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="History">History</option>
                <option value="Language">Language</option>
                <option value="Law">Law</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Medicine">Medicine</option>
                <option value="Music">Music</option>
                <option value="Religion">Religion</option>
                <option value="Science">Science</option>
                <option value="Social Sciences">Social Sciences</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="courseName">Course Name</label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                placeholder="Enter the course name"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="courseCrn">Course CRN</label>
              <input
                type="text"
                id="courseCrn"
                name="courseCrn"
                placeholder="Enter the course CRN"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                placeholder="Enter the price ($)"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="condition">Condition</label>
              <select id="condition" name="condition" required defaultValue="">
                <option value="" disabled>
                  Select the condition
                </option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div className={styles.timestamps}>
              <p className={styles.timestamp}>
                Created: {new Date().toLocaleString()}
              </p>
              <p className={styles.timestamp}>
                Last Edited: {new Date().toLocaleString()}
              </p>
            </div>

            {/* Action buttons */}
            <div className={styles.buttons}>
              <button
                type="submit"
                className={styles.confirmButton}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Confirm'}
              </button>
              <button
                type="button"
                className={styles.deleteButton}
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </Container>
    </main>
  );
};

export default ListPage;
