import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FaImages, FaUtensils, FaCalendarCheck, FaUsersCog } from "react-icons/fa";
import "./navbar.css";
import { Check2Square, GearWideConnected, HouseDoor } from "react-bootstrap-icons";

const NavbarAdmin = () => {
  const user = useSelector((state) => state.user.user);
  const isAdmin = user?.roles?.includes("ROLE_ADMIN");
  {
    /*const adminState = useSelector((state) => state.admin);*/
  }

  if (!isAdmin) return null;

  return (
    <Navbar expand="lg" className="navbar-center navbar-links-gap bg-transparent navbarAdmin" bg="dark" variant="dark">
      <Container fluid className="text-color-custom">
        <Navbar.Brand className="navbar-title ms-2">
          <GearWideConnected className="me-2" />
          Strumenti Amministratore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="  mx-auto d-flex">
            <NavDropdown
              menuVariant="dark"
              title={
                <>
                  <FaUtensils className="me-2" />
                  Menu
                </>
              }
              id="admin-nav-dropdown-menu"
            >
              <NavDropdown.Item as={Link} to="/admin/categories">
                <Check2Square className="me-2" /> Categorie
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/dishes">
                <FaUtensils className="me-2" /> Piatti
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/admin/reservations">
              <FaCalendarCheck className="me-2" /> Prenotazioni
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/users">
              <FaUsersCog className="me-2" /> Utenti
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/images">
              <FaImages className="me-2" /> Immagini
            </Nav.Link>
          </Nav>
          <Nav.Link as={Link} to="/admin" className="d-flex align-items-center ms-auto me-5">
            <HouseDoor className="me-1" /> Dashboard
          </Nav.Link>

          {/*  Indicatore di stato 
          {adminState.loading && (
            <Nav.Item className="ms-auto">
              <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
              <span className="ms-2 text-light">Caricamento...</span>
            </Nav.Item>
          )}

           Feedback per errori 
          {adminState.error && (
            <Nav.Item className="ms-auto">
              <span className="text-danger me-2">⚠️</span>
              <span className="text-danger">{adminState.error}</span>
            </Nav.Item>
          )}

           Feedback per successo 
          {adminState.success && (
            <Nav.Item className="ms-auto">
              <span className="text-success me-2">✅</span>
              <span className="text-success">{adminState.success}</span>
            </Nav.Item>
          )} */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarAdmin;
