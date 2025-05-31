import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hidePrenotazioneModal, createPrenotazione } from "../../redux/actions";
import { useState } from "react";
import FormValidator from "../common/FormValidator";

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

  const [errors, setErrors] = useState({});
  const { validateField, validate, isFormValid } = FormValidator({ type: "prenotazione" });

  const handleClose = () => dispatch(hidePrenotazioneModal());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    const tempErrors = validateField(name, value, form);
    setErrors((prev) => ({
      ...prev,
      [name]: tempErrors,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form valido:", form);
      console.log("Dati inviati al backend:", {
        nome: form.nome,
        telefono: form.telefono,
        email: form.email,
        persone: parseInt(form.persone),
        data: form.data,
        ora: form.ora,
        richieste: form.richieste,
      });
      dispatch(createPrenotazione(form));
    } else {
      console.log("Errori:", validationErrors);
      setErrors(validationErrors);
    }
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
                  isInvalid={!!errors.nome}
                />
                {errors.nome && <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>}
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
                  isInvalid={!!errors.telefono}
                  pattern="[0-9]{6,15}"
                />
                {errors.telefono && <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>}
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
                  isInvalid={!!errors.email}
                />
                {errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <FloatingLabel label="Numero di persone">
                <Form.Select
                  name="persone"
                  value={form.persone}
                  onChange={handleChange}
                  isInvalid={!!errors.persone}
                  required
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} persona{i + 1 > 1 ? "e" : ""}
                    </option>
                  ))}
                </Form.Select>
                {errors.persone && <Form.Text className="text-danger">{errors.persone}</Form.Text>}
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Data">
                <Form.Control
                  type="date"
                  name="data"
                  value={form.data}
                  onChange={handleChange}
                  isInvalid={!!errors.data}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.data && <Form.Control.Feedback type="invalid">{errors.data}</Form.Control.Feedback>}
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Ora">
                <Form.Control
                  type="time"
                  name="ora"
                  value={form.ora}
                  onChange={handleChange}
                  isInvalid={!!errors.ora}
                  required
                />
                {errors.ora && <Form.Control.Feedback type="invalid">{errors.ora}</Form.Control.Feedback>}
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
                isInvalid={!!errors.richieste}
              />
              {errors.richieste && <Form.Control.Feedback type="invalid">{errors.richieste}</Form.Control.Feedback>}
            </FloatingLabel>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100" disabled={!isFormValid(form)}>
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
