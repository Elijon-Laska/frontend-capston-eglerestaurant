import { Button, Col, Container, Form, Row } from "react-bootstrap";
{
  /*import StarRating from "./StarRating";*/
}
import "./Recensioni.css";
{
  /*import { useState } from "react";*/
}

const recensioni = [
  { nome: "Mario Rossi", rating: 5, testo: "Ottimo ristorante, servizio impeccabile!" },
  { nome: "Luca Bianchi", rating: 4, testo: "Cibo delizioso e atmosfera accogliente." },
  { nome: "Giulia Verdi", rating: 5, testo: "Esperienza fantastica, tornerò sicuramente!" },
  { nome: "Anna Neri", rating: 4, testo: "Personale gentile e piatti abbondanti." },
];

const Recensioni = () => {
  {
    return (
      <div className="fw-bold text-center mb-5 mt-5">
        <Container fluid>
          <h1 className="text-center mb-4 fw-bold">Cosa dicono di noi</h1>
          <Row className="g-3 justify-content-center">
            {recensioni.map((rec, idx) => (
              <Col xs={12} md={4} lg={2} key={idx} className="recensione recensione-glass mx-2">
                <h3>{rec.nome}</h3>
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} style={{ color: star <= rec.rating ? "#FFD700" : "#ccc" }}>
                      ★
                    </span>
                  ))}
                </div>
                <p>{rec.testo}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
    /*const [selectedStar, setSelectedStar] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  return (
    <div className="fw-bold text-center mb-5 mt-5">
      <Container fluid>
        <h1 className="text-center mb-4 fw-bold">Cosa dicono di noi</h1>
        <Row className="g-3 justify-content-center">
          {recensioni.map((rec, idx) => (
            <Col xs={12} md={4} lg={2} key={idx} className="recensione recensione-glass mx-2">
              <h3>{rec.nome}</h3>
              <StarRating rating={rec.rating} />
              <p>{rec.testo}</p>
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={8} lg={6}>
            <h2 className=" mb-4 fw-bold">Hai avuto modo di assaporare la nostra cucina?</h2>
            <h3 className=" mb-4 fw-bold">Per noi la tua opinione conta</h3>
            <h4 className=" mb-4 fw-bold">Lascia la tua valutazione</h4>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    cursor: "pointer",
                    color: hoveredStar
                      ? star <= hoveredStar
                        ? "#FFD700"
                        : "#ccc"
                      : star <= selectedStar
                      ? "#FFD700"
                      : "#ccc",
                    fontSize: "2rem",
                    transition: "color 0.2s",
                  }}
                  onClick={() => setSelectedStar(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  aria-label={`${star} stelle`}
                >
                  ★
                </span>
              ))}
            </div>
            <Form className="mt-3">
              <Form.Control as="textarea" rows={2} placeholder="Dacci anche la tua opinione" className="mb-3" />
              <Button variant="primary" type="submit">
                Invia recensione
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );*/
  }
};
export default Recensioni;
