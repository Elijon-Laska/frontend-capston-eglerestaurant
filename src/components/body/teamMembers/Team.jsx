import { Col, Container, Image, Row } from "react-bootstrap";
import logo from "../../../assets/egle-logo-1.png";
import logoProprietario from "../../../assets/proprietario-2-copia.jpg";
import "./Team.css";

const MembriTeam = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column  ">
      <Image src={logo} roundedCircle />
      <h1 className="text-center fw-bold mt-5 ">Team Unico</h1>

      <Container fluid className="text-center">
        <Row className="g-2 justify-content-center">
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow ">
            <Image src={logoProprietario} roundedCircle className="team-img" />
            <h3 className="text-center fw-bold">Nome </h3>
            <p className="text-center fw-bold">Ruolo</p>
          </Col>
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow">
            <Image src={logoProprietario} roundedCircle className="team-img" />
            <h3 className="text-center fw-bold">Nome </h3>
            <p className="text-center fw-bold">Ruolo</p>
          </Col>
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow">
            <Image src={logoProprietario} roundedCircle className="team-img" />
            <h3 className="text-center fw-bold">Nome </h3>
            <p className="text-center fw-bold">Ruolo</p>
          </Col>
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow">
            <Image src={logoProprietario} roundedCircle className="team-img" />
            <h3 className="text-center fw-bold">Nome </h3>
            <p className="text-center fw-bold">Ruolo</p>
          </Col>
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow">
            <Image src={logoProprietario} roundedCircle className="team-img" />
            <h3 className="text-center fw-bold">Nome </h3>
            <p className="text-center fw-bold">Ruolo</p>
          </Col>
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow">
            <Image src={logoProprietario} roundedCircle className="team-img" />
            <h3 className="text-center fw-bold">Nome </h3>
            <p className="text-center fw-bold">Ruolo</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default MembriTeam;
