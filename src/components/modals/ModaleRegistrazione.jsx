import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, hideRegisterModal } from "../../redux/actions";
import { useEffect, useState } from "react";
import FormValidator from "../common/FormValidator";
import { register, login } from "../../redux/actions";

const ModaleRegistrazione = () => {
  const show = useSelector((state) => state.user.showRegisterModal);
  // Selezioniamo lo stato dal Redux
  const {
    loading: { register: loading }, // loading per la registrazione
    error: { register: error }, // errore per la registrazione
    success: { register: successMessage },
    user, // successo per la registrazione
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  useEffect(() => {
    if (user) {
      dispatch(hideRegisterModal()); // Usa hideRegisterModal invece di hideLoginModal
    }
  }, [user, dispatch]);

  // Form di login
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Form di registrazione
  const [registerForm, setRegisterForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Validator per i form

  const registerValidator = FormValidator({ type: "registration" });

  // Funzione per chiudere il modale
  const handleClose = () => {
    setIsLogin(false);
    setValidationErrors({});
    dispatch(hideRegisterModal());
  };

  // Gestione del cambio email nel form di login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  // Gestione del cambio dati nel form di registrazione
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  // Gestione della registrazione
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const validationErrors = registerValidator.validate(registerForm);
    setValidationErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    dispatch(
      register({
        nome: registerForm.nome,
        cognome: registerForm.cognome,
        email: registerForm.email,
        password: registerForm.password,
        confirmPassword: registerForm.confirmPassword,
        termsAccepted: true,
      })
    );
  };

  // Gestione del login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Form di login:", loginForm);
    const validationErrors = FormValidator({ type: "login" }).validate(loginForm);
    setValidationErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log("Errori di validazione:", validationErrors);
      return;
    }
    console.log("Invio login...");
    dispatch(
      login({
        email: loginForm.email,
        password: loginForm.password,
      })
    );
    dispatch(
      login({
        email: loginForm.email,
        password: loginForm.password,
      })
    );
  };
  // Effetto per gestire il successo della registrazione
  useEffect(() => {
    if (successMessage) {
      // Se la registrazione ha avuto successo, cambia il form in login
      setIsLogin(true);
      // Prepopola il campo email con l'email di registrazione
      setLoginForm({ email: registerForm.email, password: "" });
      setTimeout(() => {
        dispatch(clearMessage("register"));
      }, 300000);
    }
  }, [successMessage, dispatch, registerForm.email]);
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
        {/* Gestione degli errori e successi */}
        {Object.keys(validationErrors).length > 0 ? (
          <Alert variant="danger" className="mb-3">
            {Object.values(validationErrors).join("\n")}
          </Alert>
        ) : error ? (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        ) : null}

        {/* Spinner di loading */}
        {loading && (
          <div className="text-center mb-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Form di login o registrazione */}
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
                isInvalid={!!FormValidator({ type: "login" }).validateField("email", loginForm.email)}
              />
              {FormValidator({ type: "login" }).validateField("email", loginForm.email) && (
                <Form.Control.Feedback type="invalid">
                  {FormValidator({ type: "login" }).validateField("email", loginForm.email)}
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
                isInvalid={!!FormValidator({ type: "login" }).validateField("password", loginForm.password)}
              />
              {FormValidator({ type: "login" }).validateField("password", loginForm.password) && (
                <Form.Control.Feedback type="invalid">
                  {FormValidator({ type: "login" }).validateField("password", loginForm.password)}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={
                !loginForm.email || !loginForm.password || loginForm.email.length < 5 || loginForm.password.length < 6
              }
            >
              Login
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
