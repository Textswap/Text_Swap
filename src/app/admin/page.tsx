'use client';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from '@/styles/AdminPage.module.css';

const AdminPage = () => {
  const items = [
    { id: 1, title: 'Textbook Title', condition: 'Good', price: '$10.99' },
    { id: 2, title: 'Textbook Title', condition: 'Good', price: '$10.99' },
    { id: 3, title: 'Textbook Title', condition: 'Good', price: '$10.99' },
    { id: 4, title: 'Textbook Title', condition: 'Good', price: '$10.99' },
    { id: 5, title: 'Textbook Title', condition: 'Good', price: '$10.99' },
    { id: 6, title: 'Textbook Title', condition: 'Good', price: '$10.99' },
  ];

  return (
    <main>
      <Container className={styles.container} fluid>
        <h1 className={styles.title}>Admin Page</h1>
        <Row>
          {items.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className={styles.card}>
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/150"
                  alt="Textbook image"
                  className={styles.cardImage}
                />
                <Card.Body className={styles.cardBody}>
                  <Card.Title className={styles.cardTitle}>
                    {item.title}
                  </Card.Title>
                  <Card.Text className={styles.cardText}>
                    Condition:
                    {item.condition}
                  </Card.Text>
                  <Card.Text className={styles.cardText}>
                    {item.price}
                  </Card.Text>
                  <div className={styles.cardButtons}>
                    <Button variant="success" className={styles.button}>
                      Approve
                    </Button>
                    <Button variant="danger" className={styles.button}>
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
