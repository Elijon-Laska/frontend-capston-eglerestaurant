import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import logo from "../../../assets/egle-logo-1.PNG";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import pranzoImg from "../../../assets/novità/pranzo.jpg";
import "./Novità.css";
import vinoImg from "../../../assets/novità/vino.avif";
import aperitivoImg from "../../../assets/novità/aperitivo.jpg";

import { showPrenotazioneModal } from "../../../redux/actions";

const UltimeNovità = () => {
  const dispatch = useDispatch();
  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5 mb-5">
      <Image src={logo} roundedCircle className="mb-4 " />
      <h1 className="text-center fw-bold">Ultime Novità</h1>

      <Container fluid className="text-center">
        <Row className="g-2 justify-content-center">
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow ">
            <Card className="rounded-0 ">
              <Card.Img variant="top" src={pranzoImg} className="rounded-0" />
              <Card.Body>
                <Card.Title>✨ Il Gusto di Pranzare con Calma</Card.Title>
                <Card.Text>
                  Concediti il piacere di un pranzo sereno, avvolto da quiete e buon gusto, 🌿 prima che arrivi la
                  frenesia della giornata. 🕚 Dalle 11:00 alle 12:00 ti accogliamo con un’attenzione speciale: <br />
                  💎 30% di sconto su tutto il nostro menu per chi sceglie di iniziare il pranzo con un pizzico di
                  anticipo e tanto stile. 🎁 Un piccolo privilegio per chi sa apprezzare il tempo, la qualità e la buona
                  cucina.
                </Card.Text>
                <Button as={Link} to="/menu" variant="primary">
                  Menu
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow">
            <Card className="rounded-0">
              <Card.Img variant="top" src={vinoImg} className="rounded-0" />
              <Card.Body>
                <Card.Title>🍷✨ Serata Degustazione: Un Viaggio nei Sapori ✨🍷</Card.Title>
                <Card.Text>
                  Ogni giovedì sera, lasciati guidare in un’esperienza unica tra gusto e raffinatezza. Un menu
                  degustazione dedicato, abbinato a una selezione di vini scelti con cura. <br />
                  🎁 Prezzo speciale riservato a chi prenota entro le ore 17:00. 🌿 Una serata da vivere con lentezza,
                  tra sapori autentici e calici che raccontano storie.
                </Card.Text>
                <Button onClick={() => dispatch(showPrenotazioneModal())} variant="primary">
                  Prenota Subito
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={6} xl={4} xxl={3} className="d-flex flex-column align-items-center team-col-shadow">
            <Card className="rounded-0">
              <Card.Img variant="top" src={aperitivoImg} className="rounded-0" />
              <Card.Body>
                <Card.Title>🍸 Aperitivo con Stile 🍸</Card.Title>
                <Card.Text>
                  Dal lunedì al venerdì, tra le 16:00 e le 19:00, lasciati tentare da un momento di gusto e relax. Un
                  cocktail d’autore 🍸 creato con cura dai nostri bartender, accompagnato da un assaggio sfizioso dalla
                  cucina 🍴 <br />
                  🎁 a un prezzo speciale, pensato per chi apprezza l’arte dell’aperitivo… fatto come si deve.
                  <br />
                  🌇 Un invito a chiudere la giornata con leggerezza, tra sapori eleganti e atmosfera rilassata.
                </Card.Text>
                <Button as={Link} to="/contatti" variant="primary" className="mt-2">
                  Contattaci Adesso
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default UltimeNovità;
