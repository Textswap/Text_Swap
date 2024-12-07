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

  // Static boxes
  const boxes = [
    { id: 1, text: 'Find Affordable Textbooks', icon: <Book /> },
    {
      id: 2,
      text: (
        <>
          Sell Your
          {' '}
          <br />
          Textbooks Easily
        </>
      ),
      icon: <CurrencyDollar />,
    },
    {
      id: 3,
      text: (
        <>
          Filter Books
          {' '}
          <br />
          {' '}
          Your Way
        </>
      ),
      icon: <Search />,
    },
    { id: 4, text: 'Add to Your Cart', icon: <Cart /> },
    {
      id: 5,
      text: (
        <>
          Sign Up
          {' '}
          <br />
          {' '}
          For Full Access
        </>
      ),
      icon: <PersonPlus />,
    },
  ];

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
            {' '}
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
          <button className={styles['home-cta-button']} type="button">Get Started</button>
        </Link>
      </div>

      <div className={styles['boxes-section']}>
        <div className={styles['boxes-container']}>
          {boxes.map((box) => (
            <div key={box.id} className={styles.box}>
              <div className={styles['box-content']}>
                <div className={styles['box-icon']}>{box.icon}</div>
                <div className={styles['box-text']}>{box.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
