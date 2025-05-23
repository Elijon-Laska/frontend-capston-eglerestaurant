import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import logo from "../../../assets/egle-logo-1.PNG";

const UltimeNovità = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5 mb-5">
      <Image src={logo} roundedCircle className="mb-4" />
      <h1 className="text-center fw-bold">Ultime Novità</h1>

      <Container fluid className="text-center">
        <Row className="g-2 justify-content-center">
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow ">
            <Card className="rounded-0">
              <Card.Img variant="top" src={logo} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow">
            <Card className="rounded-0">
              <Card.Img variant="top" src={logo} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow">
            <Card className="rounded-0">
              <Card.Img variant="top" src={logo} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default UltimeNovità;
