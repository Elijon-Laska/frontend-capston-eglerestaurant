import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import logo from "../../../src/assets/egle-logo-1.PNG";
import "./navbar.css";
import { SendArrowUpFill } from "react-bootstrap-icons";
import { Book } from "react-bootstrap-icons";
import { TelephoneFill } from "react-bootstrap-icons";
import { GeoAltFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { showPrenotazioneModal, showRegisterModal } from "../../redux/actions";
import ModaleRegistrazione from "../modals/ModaleRegistrazione";
import ModalePrenotazione from "../modals/ModalePrenotazione";
import { Link } from "react-router-dom";

const CustomNavbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Navbar expand="lg" className="bg-transparent sticky-top bg-body-tertiary ">
        <Container fluid className="text-color-custom">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center me-auto ">
            <img src={logo} alt="Logo" width="50" height="50" className="me-2 navbar-logo" />
            <span className="fw-bold navbar-title">E G L E amore e cucina</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-1" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-center mx-auto d-flex ">
              <NavDropdown title="Antipasti" id="nav-dropdown-1 " menuVariant="dark">
                <NavDropdown.Item href="#contatti">Code di gamberoni</NavDropdown.Item>
                <NavDropdown.Item href="#about">Alici Fritte</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#feedback">Vai ai dettagli</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Primi" id="nav-dropdown-2" menuVariant="dark">
                <NavDropdown.Item href="#contatti">Carbonara</NavDropdown.Item>
                <NavDropdown.Item href="#about">Amatriciana</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#feedback">Vai ai dettagli</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Secondi" id="nav-dropdown-3" menuVariant="dark">
                <NavDropdown.Item href="#contatti">Saltimbocca</NavDropdown.Item>
                <NavDropdown.Item href="#about">Ossobuco</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#feedback">Vai ai dettagli</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav className="d-flex  navbar-links-gap">
              <Nav.Link href="#home">
                <Book />
              </Nav.Link>
              <Nav.Link as={Link} to="/contatti">
                <TelephoneFill />
              </Nav.Link>
              <Nav.Link
                href="https://www.google.com/maps/search/?api=1&query=Via+Vitellia+100+00152+Roma+RM"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GeoAltFill />
              </Nav.Link>
              {user ? (
                <NavDropdown title={` ${user.nome} ${user.cognome}`} id="user-dropdown" menuVariant="dark">
                  <NavDropdown.Item onClick={() => dispatch({ type: "LOGOUT" })}>
                    <div className="d-flex align-items-center">
                      <span className="me-2">Logout</span>
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link
                  style={{ fontWeight: "bold", color: "#FFD700" }}
                  onClick={() => dispatch(showRegisterModal())}
                >
                  Log-in/Registrati
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <Button
            variant="success"
            className="navbar-button navbar-round-btn"
            onClick={() => dispatch(showPrenotazioneModal())}
          >
            <SendArrowUpFill className="ms-2" />
          </Button>
        </Container>
      </Navbar>
      <ModalePrenotazione />
      <ModaleRegistrazione />
    </>
  );
};

export default CustomNavbar;
