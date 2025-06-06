import { Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/egle-logo-1.PNG";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-2 pb-1 mt-auto">
      <Container>
        <Row className="align-items-center">
          <Col as={Link} to="/" xs={12} md={4} className="mb-2 mb-md-0 text-center text-md-start">
            <img src={logo} alt="Logo" style={{ maxWidth: "80px" }} />
          </Col>
          <Col xs={12} md={4} className="mb-2 mb-md-0 text-center">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Via+Vitellia+100+00152+Roma+RM"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light mx-2 text-decoration-none"
            >
              Find Us
            </a>
            <a href="/menu" className="text-light mx-2 text-decoration-none">
              Menu
            </a>
            <a href="/contatti" className="text-light mx-2 text-decoration-none">
              Contact
            </a>
          </Col>
          <Col xs={12} md={4} className="text-center text-md-end">
            <small>&copy; {new Date().getFullYear()} EGLE amore e cucina</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
