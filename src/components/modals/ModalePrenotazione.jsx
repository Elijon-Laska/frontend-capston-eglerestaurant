import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hidePrenotazioneModal } from "../../redux/actions";
import { useState } from "react";

const ModalePrenotazione = () => {
  const show = useSelector((state) => state.prenotazione.showPrenotazioneModal);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    nome: "",
    telefono: "",
    email: "",
    persone: 1,
    data: "",
    ora: "",
    richieste: "",
  });

  const handleClose = () => dispatch(hidePrenotazioneModal());

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui si può gestire la prenotazione (es: invio dati a backend)
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-dark text-light">
        <Modal.Title>
          Prenota il tuo tavolo da <span style={{ color: "rgba(226, 196, 196, 0.767)" }}>E G L E</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <FloatingLabel label="Nome e Cognome">
                <Form.Control
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Nome e Cognome"
                  required
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Telefono">
                <Form.Control
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="Telefono"
                  required
                  pattern="[0-9]{6,15}"
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <FloatingLabel label="Email">
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <FloatingLabel label="Numero di persone">
                <Form.Select name="persone" value={form.persone} onChange={handleChange} required>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} persona{i + 1 > 1 ? "e" : ""}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Data">
                <Form.Control
                  type="date"
                  name="data"
                  value={form.data}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Ora">
                <Form.Control type="time" name="ora" value={form.ora} onChange={handleChange} required />
              </FloatingLabel>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <FloatingLabel label="Richieste particolari (opzionale)">
              <Form.Control
                as="textarea"
                name="richieste"
                value={form.richieste}
                onChange={handleChange}
                style={{ height: "80px" }}
                placeholder="Richieste particolari"
              />
            </FloatingLabel>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Prenota ora
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-dark text-light justify-content-center">
        <small>
          Ti aspettiamo per un'esperienza unica! <span>🍽️</span>
        </small>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalePrenotazione;
