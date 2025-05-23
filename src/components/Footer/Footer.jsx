import { Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/egle-logo-1.PNG";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-2 pb-1 mt-auto">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={4} className="mb-2 mb-md-0 text-center text-md-start">
            <img src={logo} alt="Logo" style={{ maxWidth: "80px" }} />
          </Col>
          <Col xs={12} md={4} className="mb-2 mb-md-0 text-center">
            <a href="#about" className="text-light mx-2 text-decoration-none">
              About
            </a>
            <a href="#services" className="text-light mx-2 text-decoration-none">
              Services
            </a>
            <a href="#contact" className="text-light mx-2 text-decoration-none">
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
