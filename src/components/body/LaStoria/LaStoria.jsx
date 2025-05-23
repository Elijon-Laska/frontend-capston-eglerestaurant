import { useState } from "react";
import { Card, Col, Container, Image, Row, Button } from "react-bootstrap";
import "./LaStoria.css";
import logo from "../../../assets/egle-logo-1.PNG";
import logoProprietario from "../../../assets/proprietario-2-copia.jpg";
import logoProprietaria from "../../../assets/proprietaria.jpg";

const testoStoria = `
Nel cuore di Villa Pamphili, tra i profumi del bosco e i suoni della vita lenta, nasce nel 2022 il ristorante E G L E. Il nome non è scelto a caso: E G L E, nella mitologia greca, era una delle ninfe Esperidi, custode dei frutti preziosi – in particolare delle more, simbolo di dolcezza selvatica e mistero.
È proprio a lei che i fondatori hanno voluto dedicare questo luogo: un omaggio alla natura, alla bellezza semplice e all’amore per le cose autentiche.
Dietro E G L E c'è la storia di due persone – Marco e Chiara – che si sono conosciuti in una scuola di cucina di Roma.
Lì, tra una lezione su antichi lievitati e piatti della tradizione contadina, è nato prima un affiatamento, poi un sentimento profondo.
"Unire amore e cucina", dicevano sempre, "è come mescolare gli ingredienti giusti: solo così nasce qualcosa che sa toccare il cuore."
Il sogno di aprire un ristorante è diventato realtà nel 2022, in una vecchia chiesa dove un tempo si predicava il culto del amore.
Le grandi colonne, il marmo bianco, il giardino con piante di more selvatiche – in onore della ninfa – e una cucina a vista accolgono i clienti come se entrassero in un luogo pieno di storie.
Il menu di EGLE cambia con le stagioni e con le mani che lo plasmano.
Viene data importanza ai prodotti locali, a tecniche antiche rivisitate con rispetto e creatività.
Un piatto simbolo? Il Risotto alle more e rosmarino, ispirato proprio alla leggenda di E G L E e al bosco che le faceva da dimora.
Nel 2024 EGLE è stato inserito tra i 10 ristoranti rivelazione secondo una nota guida gastronomica di Epicode, non tanto per l’alta cucina, quanto per l’anima che si respira in ogni piatto.
E G L E non è solo un ristorante. È un luogo dove ogni piatto racconta una storia, ogni ingrediente ha un volto, e ogni visita lascia il sapore dell’amore, quello vero, che sa di casa e di bosco.
Benvenuti
`.trim();

const SezioneStoria = () => {
  const [expanded, setExpanded] = useState(false);

  const righe = testoStoria.split("\n");
  const testoBreve = righe.slice(0, 4).join(" ");
  const testoCompleto = righe.join(" ");

  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5">
      <Container className="statistiche-shadow">
        <h3 className="text-center mt-5 mb-4 fw-bold ">Come nasce E G L E </h3>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Image src={logo} alt="Logo E G L E" roundedCircle style={{ maxWidth: "120px" }} />
          <Image src={logo} alt="Logo E G L E" roundedCircle style={{ maxWidth: "120px" }} />
        </div>
        <Row className="gap-3 justify-content-center">
          <Col xs={12} md={6} lg={2} className="statistiche-col-bg  ">
            <Image
              src={logoProprietario}
              roundedCircle
              className="mx-auto d-block"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
          </Col>
          <Col xs={12} md={6} lg={2} className="statistiche-col-bg  ">
            <Image
              src={logoProprietaria}
              roundedCircle
              className="mx-auto d-block"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={10} lg={8}>
            <Card className="p-4 border-0 shadow-sm rounded-0">
              <Card.Body>
                <Card.Text className="fs-5 ">
                  {expanded ? testoCompleto : testoBreve}
                  {!expanded && <span>...</span>}
                </Card.Text>
                <div className="text-center mt-3">
                  <Button variant="primary" size="sm" onClick={() => setExpanded((prev) => !prev)}>
                    {expanded ? "Leggi meno" : "Leggi tutto"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SezioneStoria;
