'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Condition, Subject } from '@prisma/client';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import BookPageCard from '@/components/BookPageCard';
import BookPageCardAdmin from '@/components/BookPageCardAdmin';

interface BookDetails {
  id: number;
  title: string;
  isbn: string | null;
  subject: Subject;
  courseName: string | null;
  courseCrn: string | null;
  description: string | null;
  price: number;
  condition: Condition;
  imageURL: string;
  owner: string;
  approved: boolean;
}

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('Fetching book with ID:', id);
        const response = await fetch(`/api/book/book-page/${id}`);

        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Failed to fetch book details: ${errorText}`);
        }

        const data = await response.json();
        console.log('Fetched book data:', data);

        setBook(data);
      } catch (err) {
        console.error('Detailed error:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  useEffect(() => {
    if (session?.user?.email) {
      const fetchUserRole = async () => {
        try {
          const response = await fetch('/api/user');
          if (response.ok) {
            const data = await response.json();
            setUserRole(data.role);
          } else {
            setError('Failed to fetch user role');
          }
        } catch (err) {
          setError('Error fetching user role');
        }
      };

      fetchUserRole();
    }
  }, [session]);

  // Loading spinner
  if (loading) {
    return (
      <div className="text-center" style={{ marginTop: '20vh' }}>
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    );
  }

  // Error message
  if (error) {
    return (
      <div className="text-center">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  // Render book pages, check if user is Admin
  if (book) {
    return (
      <Container fluid className="py-3">
        {userRole === 'ADMIN' ? <BookPageCardAdmin book={book} /> : <BookPageCard book={book} />}
      </Container>
    );
  }
  return null;
};

export default BookPage;
