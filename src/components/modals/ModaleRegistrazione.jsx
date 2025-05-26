import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideRegisterModal } from "../../redux/actions";
import { useState } from "react";
import FormValidator from "../common/FormValidator";

const ModaleRegistrazione = () => {
  const show = useSelector((state) => state.user.showRegisterModal);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const loginValidator = FormValidator({ type: "login" });
  const registerValidator = FormValidator({ type: "registration" });

  const handleClose = () => {
    setIsLogin(false);
    dispatch(hideRegisterModal());
  };
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const validationErrors = registerValidator.validate(registerForm);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form di registrazione valido:", registerForm);
      // Gestisci la registrazione
      handleClose();
    } else {
      console.log("Errori:", validationErrors);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const validationErrors = loginValidator.validate(loginForm);
    if (Object.keys(validationErrors).length === 0) {
      // Gestisci il login
      handleClose();
    } else {
      console.log("Errori:", validationErrors);
    }
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
              <Form.Control
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                placeholder="Inserisci la tua email"
                isInvalid={!!loginValidator.validateField("email", loginForm.email)}
              />
              {loginValidator.validateField("email", loginForm.email) && (
                <Form.Control.Feedback type="invalid">
                  {loginValidator.validateField("email", loginForm.email)}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                placeholder="Inserisci la password"
                isInvalid={!!loginValidator.validateField("password", loginForm.password)}
              />
              {loginValidator.validateField("password", loginForm.password) && (
                <Form.Control.Feedback type="invalid">
                  {loginValidator.validateField("password", loginForm.password)}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" disabled={!loginValidator.isFormValid(loginForm)}>
              Accedi
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handleRegisterSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={registerForm.nome}
                    onChange={handleRegisterChange}
                    placeholder="Inserisci il tuo nome"
                    isInvalid={!!registerValidator.validateField("nome", registerForm.nome, registerForm)}
                  />
                  {registerValidator.validateField("nome", registerForm.nome, registerForm) && (
                    <Form.Control.Feedback type="invalid">
                      {registerValidator.validateField("nome", registerForm.nome, registerForm)}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    name="cognome"
                    value={registerForm.cognome}
                    onChange={handleRegisterChange}
                    placeholder="Inserisci il tuo cognome"
                    isInvalid={!!registerValidator.validateField("cognome", registerForm.cognome, registerForm)}
                  />
                  {registerValidator.validateField("cognome", registerForm.cognome, registerForm) && (
                    <Form.Control.Feedback type="invalid">
                      {registerValidator.validateField("cognome", registerForm.cognome, registerForm)}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                placeholder="Inserisci la tua email"
                isInvalid={!!registerValidator.validateField("email", registerForm.email, registerForm)}
              />
              {registerValidator.validateField("email", registerForm.email, registerForm) && (
                <Form.Control.Feedback type="invalid">
                  {registerValidator.validateField("email", registerForm.email, registerForm)}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                placeholder="Crea una password"
                isInvalid={!!registerValidator.validateField("password", registerForm.password, registerForm)}
              />
              {registerValidator.validateField("password", registerForm.password, registerForm) && (
                <Form.Control.Feedback type="invalid">
                  {registerValidator.validateField("password", registerForm.password, registerForm)}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Conferma Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                placeholder="Conferma la password"
                isInvalid={
                  !!registerValidator.validateField("confirmPassword", registerForm.confirmPassword, registerForm)
                }
              />
              {registerValidator.validateField("confirmPassword", registerForm.confirmPassword, registerForm) && (
                <Form.Control.Feedback type="invalid">
                  {registerValidator.validateField("confirmPassword", registerForm.confirmPassword, registerForm)}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Accetto i termini e le condizioni" required />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="w-100"
              disabled={!registerValidator.isFormValid(registerForm)}
            >
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
                style={{ color: "rgba(226, 196, 196, 0.767)", cursor: "pointer" }}
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
