/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import React, { useEffect, useState } from 'react';
import {
  Book,
  Cart,
  CurrencyDollar,
  PersonPlus,
  Search,
} from 'react-bootstrap-icons';
import { BookCheck } from 'lucide-react';
import Link from 'next/link';
import styles from '../styles/LandingPage.module.css';

const Home = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const words = ['SMART', 'AFFORDABLE', 'EASY'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    content: string;
    image?: string;
    title: string;
  }>({
    content: '',
    image: undefined,
    title: '',
  });

  const fullText = 'TextSwap';
  const typingSpeed = 100;

  // Typing effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
    setIsTypingComplete(true);
    return undefined; // Explicit return when no timeout is set
  }, [typedText, fullText]);

  // Word rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);

  // Description boxes
  const boxes = [
    {
      id: 1,
      text: 'Find Affordable Textbooks',
      icon: <Book />,
      preview:
        'Discover the best deals on textbooks and save big on your academic journey!',
      image: '/TextSwap.png',
      title: 'Find Affordable Textbooks',
    },
    {
      id: 2,
      text: (
        <>
          Sell Your
          <br />
          Textbooks Easily
        </>
      ),
      icon: <CurrencyDollar />,
      preview: 'Turn your old textbooks into cash in just a few clicks!',
      image: '/TextSwap.png',
      title: 'Sell Your Textbooks Easily',
    },
    {
      id: 3,
      text: (
        <>
          Filter Books
          <br />
          Your Way
        </>
      ),
      icon: <Search />,
      preview: 'Find the perfect book with filters that match your needs!',
      image: '/TextSwap.png',
      title: 'Filter Books Your Way',
    },
    {
      id: 4,
      text: 'Add to Your Cart',
      icon: <Cart />,
      preview:
        'Keep your favorite books in one place—just a step away from checkout!',
      image: '/TextSwap.png',
      title: 'Add to Your Cart',
    },
    {
      id: 5,
      text: (
        <>
          Sign Up
          <br />
          For Full Access
        </>
      ),
      icon: <PersonPlus />,
      preview:
        'Join us today for affordable access to all your textbook needs!',
      image: '/TextSwap.png',
      title: 'Sign Up For Full Access',
    },
  ];

  const openModal = (content: string, image: string, title: string) => {
    setModalContent({ content, image, title });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent({ content: '', image: undefined, title: '' });
    setIsModalOpen(false);
  };

  return (
    <div className={styles['home-container']}>
      <div className={styles['home-content']}>
        {/* Animated Logo */}
        <div className={styles['logo-container']}>
          <h1 className={styles['home-logo']}>
            {typedText}
            {isTypingComplete && (
              <BookCheck
                style={{
                  marginLeft: '10px',
                  width: '50px',
                  height: '50px',
                  color: '#318768',
                  verticalAlign: 'middle',
                }}
              />
            )}
          </h1>
        </div>

        {/* Dynamic Tagline */}
        <div className={styles['home-tagline']}>
          <p>
            Find Your Next Textbook,
            <br />
            the
            {' '}
            <span key={currentWordIndex} className={styles['home-flip-word']}>
              {` ${words[currentWordIndex]} `}
            </span>
            {' '}
            way
          </p>
        </div>

        {/* CTA Button */}
        <Link href="/auth/signup">
          <button className={styles['home-cta-button']} type="button">
            Get Started
          </button>
        </Link>
      </div>
      <div className={styles['boxes-section']}>
        <div className={styles['boxes-container']}>
          {boxes.map((box) => (
            <div
              key={box.id}
              className={styles.box}
              onClick={() => openModal(box.preview, box.image || '', box.title)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openModal(box.preview, box.image || '', box.title);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open modal for ${box.title}`}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles['box-content']}>
                <div className={styles['box-icon']}>{box.icon}</div>
                <div className={styles['box-text']}>{box.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className={styles['modal-overlay']}
          onClick={closeModal}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              closeModal();
            }
          }}
          role="dialog"
          tabIndex={-1}
          aria-labelledby="modal-title"
        >
          <div
            className={styles['modal-content']}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles['modal-title']}>{modalContent.title}</h2>
            {modalContent.image && (
              <img
                src={modalContent.image}
                alt="Preview"
                className={styles['modal-image']}
              />
            )}
            <p>{modalContent.content}</p>
            <button
              className={styles['close-button']}
              onClick={closeModal}
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
