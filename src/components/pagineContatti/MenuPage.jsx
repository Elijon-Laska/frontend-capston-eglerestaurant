import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

import "./MenuPage.css";

const MenuPage = () => {
  const { dishes } = useSelector((state) => state.dishes);

  const renderDishes = (category) => {
    return dishes[category]?.map((dish, index) => (
      <Col key={index} md={4} xl={2} className="mb-4 mt-4">
        <Card className="menu-card">
          <Card.Img variant="top" src={dish.imageUrl} className="menu-card-img" />
          <Card.Body className="menu-card-body ">
            <Card.Title>{dish.name}</Card.Title>
            <Card.Text className="text-success">{dish.price}€</Card.Text>
            <Card.Text>{dish.composition}</Card.Text>
            {/*<Card.Text>{dish.descrizione || "Nessuna descrizione disponibile"}</Card.Text>*/}
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <Container fluid className="menu-page">
      <Row className="my-5">
        <Col xs={12} className="text-center">
          <h1>E G L E amore e cucina</h1>
          <h2>Menù</h2>
        </Col>
      </Row>

      <Row className="text-center my-5">
        <Col xs={12}>
          <h1> Antipasti</h1>
        </Col>
        <Col xs={12}>
          <Row className="menu-row">{renderDishes("ANTIPASTI")}</Row>
        </Col>
      </Row>

      <Row className="text-center my-5">
        <Col xs={12}>
          <h1>Primi</h1>
        </Col>
        <Col xs={12}>
          <Row className="menu-row">{renderDishes("PRIMI")}</Row>
        </Col>
      </Row>

      <Row className="text-center my-5">
        <Col xs={12}>
          <h1>Secondi</h1>
        </Col>
        <Col xs={12}>
          <Row className="menu-row">{renderDishes("SECONDI")}</Row>
        </Col>
      </Row>

      <Row className="text-center my-5">
        <Col xs={12}>
          <h1>Contorni</h1>
        </Col>
        <Col xs={12}>
          <Row className="menu-row">{renderDishes("CONTORNI")}</Row>
        </Col>
      </Row>

      <Row className="text-center my-5">
        <Col xs={12}>
          <h1>Dolci</h1>
        </Col>
        <Col xs={12}>
          <Row className="menu-row">{renderDishes("DOLCI")}</Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MenuPage;
