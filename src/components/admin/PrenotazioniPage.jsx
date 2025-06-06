import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { confirmReservation, cancelReservation, fetchAdminDashboard } from "../../redux/actions/adminActions";
import { Button, Card, Container, Table, Modal, Form, Spinner, Alert } from "react-bootstrap";
import { FaCheck, FaTimes, FaCalendarCheck, FaInfoCircle } from "react-icons/fa";

const PrenotazioniPage = () => {
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // Gestione prenotazioni
  const handleConfirm = (codice) => {
    dispatch(confirmReservation(codice));
  };

  const handleCancel = (codice) => {
    dispatch(cancelReservation(codice));
  };

  const handleDetails = (reservation) => {
    setSelectedReservation(reservation);
    setShowDetailsModal(true);
  };

  const handleClose = () => {
    setShowDetailsModal(false);
    setSelectedReservation(null);
  };

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  return (
    <div className="prenotazioni-page">
      <Container fluid>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Gestione Prenotazioni</h1>
          {adminState.loading && <Spinner animation="border" variant="primary" size="sm" className="m-2" />}
          {adminState.error && (
            <Alert variant="danger">
              <FaTimes className="me-2" />
              {adminState.error}
            </Alert>
          )}
          {adminState.success && (
            <Alert variant="success">
              <FaCheck className="me-2" />
              {adminState.success}
            </Alert>
          )}
        </div>

        <Card>
          <Card.Header>
            <h3 className="mb-0">
              <FaCalendarCheck className="me-2" /> Prenotazioni ({adminState.reservations.length})
            </h3>
          </Card.Header>
          <div className="table-responsive">
            <Card.Body>
              <Table striped>
                <thead>
                  <tr>
                    <th>Codice</th>
                    <th>Data</th>
                    <th>Ora</th>
                    <th>Nome</th>
                    <th>Persone</th>
                    <th>Stato</th>
                    <th className="d-flex justify-content-end">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {adminState.reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>{reservation.codicePrenotazione}</td>
                      <td>{reservation.data}</td>
                      <td>{reservation.ora}</td>
                      <td>{reservation.nome}</td>
                      <td>{reservation.persone}</td>
                      <td>
                        <span
                          className={`badge ${
                            reservation.confermata ? "bg-success" : reservation.annullata ? "bg-danger" : "bg-warning"
                          }`}
                        >
                          {reservation.confermata ? "Confermata" : reservation.annullata ? "Annullata" : "In attesa"}
                        </span>
                      </td>
                      <td className="d-flex justify-content-end">
                        <Button variant="outline-primary" size="sm" onClick={() => handleDetails(reservation)}>
                          <FaInfoCircle className="me-2" /> Dettagli
                        </Button>
                        {!reservation.confermata && !reservation.annullata && (
                          <>
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => handleConfirm(reservation.codicePrenotazione)}
                            >
                              <FaCheck className="me-2" /> Conferma
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleCancel(reservation.codicePrenotazione)}
                            >
                              <FaTimes className="me-2" /> Annulla
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </div>
        </Card>
      </Container>

      {/* Modal Dettagli Prenotazione */}
      <Modal show={showDetailsModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dettagli Prenotazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReservation && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Codice Prenotazione</Form.Label>
                <Form.Control type="text" value={selectedReservation.codicePrenotazione || ""} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data</Form.Label>
                <Form.Control type="text" value={selectedReservation.data || ""} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ora</Form.Label>
                <Form.Control type="text" value={selectedReservation.ora || ""} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" value={selectedReservation.nome || ""} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Numero Persone</Form.Label>
                <Form.Control type="text" value={selectedReservation.persone || ""} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={selectedReservation.email || ""} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Telefono</Form.Label>
                <Form.Control type="tel" value={selectedReservation.telefono || ""} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Richieste Speciali</Form.Label>
                <Form.Control as="textarea" rows={3} value={selectedReservation.richieste || ""} disabled />
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

export default PrenotazioniPage;
