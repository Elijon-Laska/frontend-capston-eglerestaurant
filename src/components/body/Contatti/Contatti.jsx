import { Container, Row, Col, Card } from "react-bootstrap";

const Contatti = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4 fw-bold">Contatti</h1>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="mb-4 mb-md-0">
          <Card className="p-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title className="mb-3 fw-bold">I nostri recapiti</Card.Title>
              <div className="mb-2">
                <strong>Telefono:</strong> +39 02 12345678
              </div>
              <div className="mb-2">
                <strong>WhatsApp:</strong> +39 02 12345678
              </div>
              <div className="mb-2">
                <strong>Email:</strong> info@egleroma.it
              </div>
              <div className="mb-2">
                <strong>Indirizzo:</strong> Via Vitellia, 100, 00152 Roma RM
              </div>
              <div className="mb-2">
                <strong>Orari:</strong> Lun-Ven: 11:00-23:00
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <iframe
            src="https://www.google.com/maps?q=Via+Vitellia+100+00152+Roma+RM&output=embed"
            width="100%"
            height="300"
            style={{ border: 0, minHeight: "250px", background: "none", display: "block", maxHeight: "280px" }}
          ></iframe>
        </Col>
      </Row>
    </Container>
  );
};

export default Contatti;
