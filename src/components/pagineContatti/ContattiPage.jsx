import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

const ContattiPage = () => (
  <Container className="my-5">
    <Row className="justify-content-center">
      <Col xs={12} md={6} className="mb-4 mb-md-0">
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Card.Title className="mb-3 fw-bold text-primary">I nostri recapiti</Card.Title>
            <ListGroup variant="flush" className="mb-3">
              <ListGroup.Item>
                <strong>Telefono:</strong> <a href="tel:+390212345678">+39 02 12345678</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>WhatsApp:</strong>
                <a href="https://wa.me/390212345678" target="_blank" rel="noopener noreferrer">
                  +39 02 12345678
                </a>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email:</strong> <a href="mailto:info@egleroma.it">info@egleroma.it</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Indirizzo:</strong> Via Vitellia, 100, 00152 Roma RM
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Orari:</strong> Lun-Ven: 11:00-23:00
              </ListGroup.Item>
            </ListGroup>
            <div className="mb-3">
              <strong>Parcheggio:</strong> Disponibile nelle vicinanze
              <br />
              <strong>Accessibilità:</strong> Locale accessibile a persone con disabilità
              <br />
              <strong>Wi-Fi:</strong> Gratuito per i clienti
              <br />
              <strong>Animali:</strong> Ammessi animali di piccola taglia
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={6}>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Card.Title className="mb-3 fw-bold text-primary">Dove siamo</Card.Title>
            <iframe
              src="https://www.google.com/maps?q=Via+Vitellia+100+00152+Roma+RM&output=embed"
              width="100%"
              height="300"
              style={{ border: 0, minHeight: "250px", background: "none", display: "block", maxHeight: "280px" }}
              allowFullScreen=""
              loading="lazy"
              title="Mappa E G L E"
            ></iframe>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row className="mt-4">
      <Col xs={12}>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Card.Title className="fw-bold text-primary">Altre informazioni utili</Card.Title>
            <ul>
              <li>Per prenotazioni puoi usare il nostro modulo online o chiamarci direttamente.</li>
              <li>
                Segui le nostre novità su
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
                e
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
                .
              </li>
              <li>Per richieste particolari (allergie, eventi, catering) scrivici una mail o usa WhatsApp.</li>
              <li>Accettiamo pagamenti con carte, bancomat e Satispay.</li>
            </ul>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default ContattiPage;
