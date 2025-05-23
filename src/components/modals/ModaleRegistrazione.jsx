import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideRegisterModal } from "../../redux/actions";
import { useState } from "react";

const ModaleRegistrazione = () => {
  const show = useSelector((state) => state.user.showRegisterModal);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  const handleClose = () => {
    setIsLogin(false);
    dispatch(hideRegisterModal());
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Qui si puo gestire la registrazione
    handleClose();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Qui si puo gestire il login (es: chiamata API)
    // Se login ok: handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-dark text-light">
        <Modal.Title>
          {isLogin ? (
            <>
              Accedi a <span style={{ color: "rgba(226, 196, 196, 0.767)" }}>E G L E</span>
            </>
          ) : (
            <>
              Registrati su <span style={{ color: "rgba(226, 196, 196, 0.767)" }}>E G L E</span>
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        {isLogin ? (
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Inserisci la tua email" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Inserisci la password" required minLength={6} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Accedi
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handleRegisterSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" placeholder="Inserisci il tuo nome" required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control type="text" placeholder="Inserisci il tuo cognome" required />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Inserisci la tua email" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Crea una password" required minLength={6} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Accetto i termini e le condizioni" required />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">
              Registrati
            </Button>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-dark text-light justify-content-center">
        <small>
          {isLogin ? (
            <>
              Non hai un account?
              <a
                href="#"
                style={{ color: "rgba(226, 196, 196, 0.767);", cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(false);
                }}
              >
                Registrati
              </a>
            </>
          ) : (
            <>
              Hai già un account?
              <a
                href="#"
                style={{ color: "rgba(226, 196, 196, 0.767)", cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(true);
                }}
              >
                Accedi
              </a>
            </>
          )}
        </small>
      </Modal.Footer>
    </Modal>
  );
};

export default ModaleRegistrazione;
