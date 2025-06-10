import { Col, Container, Image, Row } from "react-bootstrap";
import logo from "../../../assets/egle-logo-1.PNG";
import "./Team.css";
import direttoreImg from "../../../assets/team/direttore.jpg";
import somelierImg from "../../../assets/team/somelier.jpg";
import cameriereImg from "../../../assets/team/cameriere.jpg";
import hostesImg from "../../../assets/team/hostes.avif";
import chefImg from "../../../assets/team/cheff.avif";
import pizzaioloImg from "../../../assets/team/pizzaiolo.avif";

const MembriTeam = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column  ">
      <Image src={logo} roundedCircle />
      <h1 className="text-center fw-bold mt-5 ">Team Unico</h1>

      <Container fluid className="text-center">
        <Row className="g-2 justify-content-center">
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow ">
            <Image src={direttoreImg} roundedCircle className="team-img" />
            <h3 className="text-center fw-bold">Remo </h3>
            <p className="text-center fw-bold">Direttore di Sala</p>
          </Col>
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow">
            <Image src={somelierImg} roundedCircle className="team-img" />
            <h3 className="text-center fw-bold">Cristopher</h3>
            <p className="text-center fw-bold">Bartender</p>
          </Col>
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow">
            <Image src={cameriereImg} roundedCircle className="team-img" />
            <h3 className="text-center fw-bold">Yousef </h3>
            <p className="text-center fw-bold">Cameriere</p>
          </Col>
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow">
            <Image src={hostesImg} roundedCircle className="team-img" />
            <h3 className="text-center fw-bold">Arlene</h3>
            <p className="text-center fw-bold">Hostess di sala</p>
          </Col>
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow">
            <Image src={chefImg} roundedCircle className="team-img" />
            <h3 className="text-center fw-bold">Abdel </h3>
            <p className="text-center fw-bold">Executive chef</p>
          </Col>
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow">
            <Image src={pizzaioloImg} roundedCircle className="team-img" />
            <h3 className="text-center fw-bold">Andrea </h3>
            <p className="text-center fw-bold">Sous-chef</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default MembriTeam;
