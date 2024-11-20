import { Col, Container, Image, Row } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page">
      <Row>
        <Col className="landing-content">
          <h1>TextSwap</h1>
          <h2>Affordable Access to Education</h2>
        </Col>
        <Col>
          <Image src="/landingpage-book.png" height="500px" />
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
