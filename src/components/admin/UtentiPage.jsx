import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers, blockUser, unblockUser, deleteUser } from "../../redux/actions/adminActions";
import { Button, Card, Container, Row, Col, Table, Modal, Form, Spinner } from "react-bootstrap";
import { FaUser, FaBan, FaCheck, FaTrash, FaTimes } from "react-icons/fa";

const UtentiPage = () => {
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Gestione utenti
  const handleBlock = (userId) => {
    dispatch(blockUser(userId));
  };

  const handleUnblock = (userId) => {
    dispatch(unblockUser(userId));
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleDetails = (user) => {
    console.log("DETTAGLI UTENTE:", user);
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleClose = () => {
    setShowDetailsModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="utenti-page">
      <Container fluid>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="my-3">Gestione Utenti</h1>
          {adminState.loading && <Spinner animation="border" variant="primary" size="sm" className="m-2" />}
          {adminState.error && (
            <span className="text-danger">
              <FaTimes className="me-2" />
              {adminState.error}
            </span>
          )}
          {adminState.success && (
            <span className="text-success">
              <FaCheck className="me-2" />
              {adminState.success}
            </span>
          )}
        </div>

        <Row>
          <Col xs={12} md={12} className="my-2">
            <Card>
              <Card.Header>
                <h3 className="mb-0">
                  <FaUser className="me-2" /> Tutti gli Utenti ({adminState.users.length})
                </h3>
              </Card.Header>
              <div className="table-responsive">
                <Card.Body>
                  <Table striped>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Email</th>

                        <th className="d-flex justify-content-end ms-5">Azioni</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminState.users
                        .filter((user) => !adminState.blockedUsers.some((bu) => bu.id === user.id))
                        .map((user) => (
                          <tr key={user.id}>
                            <td>
                              {user.nome} {user.cognome}
                            </td>
                            <td>{user.email}</td>
                            <td>{user.reservationsCount}</td>
                            <td>
                              <Button variant="outline-danger" size="sm" onClick={() => handleBlock(user.id)}>
                                <FaBan className="me-2" /> Blocca
                              </Button>
                              <Button variant="outline-primary" size="sm" onClick={() => handleDetails(user)}>
                                Dettagli
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </div>
            </Card>
          </Col>

          <Col xs={12} md={12} className="my-2">
            <Card>
              <Card.Header>
                <h3 className="mb-0">
                  <FaUser className="me-2" /> Utenti Bloccati ({adminState.blockedUsers.length})
                </h3>
              </Card.Header>
              <div className="table-responsive">
                <Card.Body>
                  <Table striped>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Data Blocco</th>
                        <th>Azioni</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminState.blockedUsers.map((user) => (
                        <tr key={user.id}>
                          <td>
                            {user.nome} {user.cognome}
                          </td>
                          <td>{user.email}</td>
                          <td>{user.blockDate}</td>
                          <td>
                            <Button variant="outline-success" size="sm" onClick={() => handleUnblock(user.id)}>
                              <FaCheck className="me-2" /> Sblocca
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(user.id)}>
                              <FaTrash className="me-2" /> Elimina
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal Dettagli Utente */}
      <Modal show={showDetailsModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dettagli Utente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" value={`${selectedUser.nome || ""} ${selectedUser.cognome || ""}`} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={selectedUser.email || ""} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data Registrazione</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.createdAt ? selectedUser.createdAt.split("T")[0] : ""}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ultimo Accesso</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.lastLogin ? selectedUser.lastLogin.split("T")[0] : ""}
                  disabled
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UtentiPage;
