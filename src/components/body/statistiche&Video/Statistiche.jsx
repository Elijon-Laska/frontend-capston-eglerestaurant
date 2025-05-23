import { Col, Container, Row } from "react-bootstrap";
import "./Statistiche.css";
import videoSrc from "../../../assets/secondo-video.mp4";

const SezioneStatistiche = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5">
      <Container className="statistiche-shadow">
        <h3 className="text-center mt-5 mb-4 fw-bold ">I nostri risultati</h3>
        <Row className="gap-3 justify-content-center">
          <Col xs={12} md={6} lg={2} className="statistiche-col-bg fw-bold">
            <h4 className="text-center fw-bold  ">15</h4>
            <p className="text-center fw-bold">Anni esperienza</p>
          </Col>
          <Col xs={12} md={6} lg={2} className="statistiche-col-bg">
            <h4 className="text-center fw-bold">300</h4>
            <p className="text-center fw-bold">Clienti Felici</p>
          </Col>
          <Col xs={12} md={6} lg={2} className="statistiche-col-bg">
            <h4 className="text-center fw-bold">5</h4>
            <p className="text-center fw-bold">Premi ricevuti</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <video src={videoSrc} autoPlay loop muted playsInline className="statistiche-video" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SezioneStatistiche;
